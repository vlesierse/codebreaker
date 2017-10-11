#!/bin/bash

warm_up()
{
    sleep 5s
    curl -s http://localhost:5000 > /dev/null
    while [ $? -ne 0 ]; do
        echo "Warm up"
        curl -s http://localhost:5000 > /dev/null
        sleep 2s
    done
}

warm_up &
dotnet CodeBreaker.WebApp.dll