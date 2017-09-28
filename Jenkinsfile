podTemplate(label: 'docker',
  containers: [
    containerTemplate(name: 'docker', image: 'docker:stable-git', ttyEnabled: true, command: 'cat'),
    containerTemplate(name: 'dotnet', image: 'microsoft/aspnetcore-build:2.0', ttyEnabled: true, command: 'cat')
  ],
  volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')]
  ) {

  node('docker') {
    checkout scm
    def commit = env['GIT_COMMIT']
    def shortCommit = commit[0..6]

    stage('Build & Test .NET Application') {
      container('dotnet') {
        sh "dotnet restore"
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
  }
}