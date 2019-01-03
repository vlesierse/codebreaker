pipeline {
  agent {
    kubernetes {
      label 'agent'
      yamlFile 'JenkinsPod.yaml'
    }
  }
  stages {
    stage('Build & Publish Image') {
      steps {
        container('docker') {
          script {
            def shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
            docker.withRegistry('https://howdio.azurecr.io', 'howdio.azurecr.io') {
              sh "docker build -t codebreaker:${shortCommit} ."
              def image = docker.image("codebreaker:${shortCommit}")
              image.push()
            }
          }
        }
      }
    }
  }
}