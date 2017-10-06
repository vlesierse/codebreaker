'use strict';

let _ = require('highland');
let vamp = require('vamp-node-client');

let api = new vamp.Api();
let http = new vamp.Http();
let metrics = new vamp.ElasticsearchMetrics(api);
let headers = {'Accept': 'application/json', 'Content-Type': 'application/json'};

var $gateway  = process.env.GATEWAY;
var $service1 = process.env.GATEWAY_SOURCE;
var $service2 = process.env.GATEWAY_TARGET;

var $workflowId = process.env.WORKFLOW_ID;
var $step = Number(process.env.DEPLOYMENT_STEP || '5'); // percentage
var $period = Number(process.env.DEPLOYMENT_PERIOD || '5'); // seconds

var $metric = process.env.METRIC_NAME;
var $metricExpression = process.env.METRIC_EXPRESSION;

var $tags = ['gateways:' + $gateway, 'source:' + $service1, 'target:' + $service2];
if ($workflowId) $tags.push($workflowId);

var run = function () {
  api.get('gateways/' + $gateway).each(function (gateway) {
    var routeSegments = $service2.split('/');
    api.get(`health/deployments/${routeSegments[0]}/clusters/${routeSegments[1]}/services/${routeSegments[2]}`, true).each(function(health) {
      if (health == 0)
        rollback(gateway);
      else
      {
        if ($metric && $metricExpression) {
          let events = _(http.get(api.url + `/events?type=metrics&tag=routes:${$service2}&tag=metrics:${$metric}`, {headers: headers}).then(JSON.parse));
          events.flatMap(_).head().each(function (event) {
            if (!eval(`${event.value} ${$metricExpression}`))
              rollback(gateway);
            else
              increase(gateway, gateway['routes'][$service1]['weight']);
          });
        } else {
          increase(gateway, gateway.routes[$service1].weight);
        }
      }
    });
  });
};

var increase = function (gateway, oldWeight) {
  oldWeight = oldWeight.substring(0, oldWeight.length - 1);
  if (oldWeight > 0) {
    var newWeight = oldWeight - $step;
    gateway['routes'][$service1]['weight'] = newWeight < 0 ? '0%' : newWeight + '%';
    gateway['routes'][$service2]['weight'] = newWeight < 0 ? '100%' : (100 - newWeight) + '%';
    update(gateway);
  } else {
    api.event([... $tags, 'finished'], null, 'deployment');
  }
};

var rollback = function (gateway) {
  if ( gateway['routes'][$service1]['weight'] !== '100%') {
    gateway['routes'][$service1]['weight'] = '100%';
    gateway['routes'][$service2]['weight'] = '0%';
    api.event([... $tags, 'aborted'], null, 'deployment');
    update(gateway);
  }
};

var update = function (gateway) {
  http.request(api.url + '/gateways/' + $gateway, {method: 'PUT', headers: headers}, JSON.stringify(gateway)).then(function () {
    //api.event([... $tags, 'updated'], null, 'deployment');
  }).catch(function (error) {
    api.event([... $tags, 'error'], error, 'deployment');
  });
};

run();
setInterval(run, $period * 1000);