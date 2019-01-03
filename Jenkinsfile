podTemplate(label: 'kubernetes',
  containers: [
    containerTemplate(name: 'docker', image: 'docker:stable-git', ttyEnabled: true, command: 'cat')
  ],
  volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')]
  ) {

  node('kubernetes') {
    checkout scm
    def shortCommit = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()

    stage('Build & Publish Docker image') {
      container('docker') {
        docker.withRegistry('https://howdio.azurecr.io', 'howdio.azurecr.io') {
          sh "docker build -t codebreaker:${shortCommit} ."
          def image = docker.image("codebreaker:${shortCommit}")
          image.push()
        }
      }
    }
  }
}