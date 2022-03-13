pipeline {
  agent any
  stages {
      stage('Linting') {
          steps {
          echo 'linting..'
          }
      }
      stage('Build') {
        when { 
          branch 'master'
          anyOf {
            changeset "dns-updater.yaml"
          }
        }
        steps {
            echo 'Update dns-updater....'
            sh("kubectl apply -f dns-updater.yaml")
          }  
        }
      stage('Build Docs') {
        when { changeset "docs/**" }
        steps {
            echo 'Build Docs...'
          }  
        }
      }
      post {
        success {
           echo "Build successfully..."
           slackSend color: "good", message: "Build successfully on $JOB_NAME..."
       }
       failure {
           echo "Build failed..."
           slackSend color: "danger", message: "Build failed on $JOB_NAME..."
       }
    }
}
