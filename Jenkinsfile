pipeline {
  agent {
    kubernetes {
      label 'codebreaker'
      containerTemplate {
        name 'docker'
        image 'docker:stable-git'
        ttyEnabled true
        command 'cat'
      }
      containerTemplate {
        name 'dotnet'
        image 'microsoft/aspnetcore-build:2.0'
        ttyEnabled true
        command 'cat'
      }
      containerTemplate {
        name 'cloudio'
        image 'vlesierse/cloudio-cli:0.1.0'
        ttyEnabled true
        command 'cat'
      }
    }
  }
  stages {
    stage('Build & Test .NET Application') {
      steps {
        container('dotnet') {
          sh 'dotnet restore'
          sh 'dotnet test test/**/*.csproj'
        }
      }
    }
    stage('Build & Publish Docker image') {
      when { branch 'master' }
      steps {
        container('dotnet') {
          sh "dotnet publish -o ./out/ -c Release --self-contained -r linux-x64"
        }
        container('docker') {
          docker.withRegistry('https://codebreaker.azurecr.io', 'codebreaker.azurecr.io') {
            sh "docker build -t codebreaker:${shortCommit} src/CodeBreaker.WebApp"
            def image = docker.image("codebreaker:${shortCommit}")
            image.push()
            image.push('latest')
          }
        }
      }
    }
    stage('Deploy application') {
      when { branch 'master' }
      steps {
        container('cloudio') {
          sh "cloudio deploy codebreaker codebreaker:${shortCommit} --cluster codebreaker --breed codebreaker --deployable codebreaker.azurecr.io/codebreaker:${shortCommit}"
        }
      }
    }
  }
}