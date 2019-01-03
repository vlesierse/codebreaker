pipeline {
  agent {
    kubernetes {
      label 'pod'
      yamlFile 'JenkinsPod.yaml'
    }
  }
  stages {
    stage('Build & Publish Image') {
      steps {
        container('docker') {
          script {
            shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
            docker.withRegistry('https://howdio.azurecr.io', 'howdio.azurecr.io') {
              sh "docker build -t codebreaker:${shortCommit} ."
              image = docker.image("codebreaker:${shortCommit}")
              image.push()
            }
          }
        }
      }
    }
    stage('Deploy') {
      steps {
        container('vamp-cli-ee') {
          script {
            echo "Vamp Deploy: ${image}"
          }
        }
      }
    }
  }
}