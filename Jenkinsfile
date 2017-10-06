podTemplate(label: 'docker',
  containers: [
    containerTemplate(name: 'docker', image: 'docker:stable-git', ttyEnabled: true, command: 'cat'),
    containerTemplate(name: 'dotnet', image: 'microsoft/aspnetcore-build:2.0', ttyEnabled: true, command: 'cat')
    containerTemplate(name: 'cloudio', image: 'vlesierse/cloudio-cli:0.1.0', ttyEnabled: true, command: 'cat')
  ],
  volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')]
  ) {

  node('docker') {
    checkout scm
    def shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()

    stage('Build & Test .NET Application') {
      container('dotnet') {
        sh "dotnet restore"
        sh "dotnet test test/**/*.csproj"
        sh "dotnet publish -o ./out/ -c Release --self-contained -r linux-x64"
      }
    }
    stage('Build Docker image') {
      container('docker') {
        docker.withRegistry('https://codebreaker.azurecr.io', 'codebreaker.azurecr.io') {
          sh "docker build -t codebreaker:${shortCommit} src/CodeBreaker.WebApp"
          def image = docker.image("codebreaker:${shortCommit}")
          image.push()
          image.push('latest')
        }
      }
    }
    stage('Deploy application') {
      container('cloudio') {
        sh 'cloudio --version'
        //sh "cloudio deploy codebreaker codebreaker:${shortCommit} --cluster codebreaker --breed codebreaker --deployable codebreaker.azurecr.io/codebreaker:${shortCommit}"
      }
    }
  }
}