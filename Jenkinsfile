pipeline {
    agent any

    environment {
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t vue-app .'
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sh '''
                ansible-playbook -i inventory.ini deploy.yml
                '''
            }
        }
    }

    post {

        success {
            emailext (
                subject: "SUCCESS: ${JOB_NAME} #${BUILD_NUMBER}",
                body: "Deployment successful.",
                recipientProviders: [
                    [$class: 'CulpritsRecipientProvider'],
                    [$class: 'DevelopersRecipientProvider'],
                    [$class: 'RequesterRecipientProvider']
                ]
            )
        }

        failure {
            emailext (
                subject: "FAILED: ${JOB_NAME} #${BUILD_NUMBER}",
                body: "Deployment failed.",
                attachLog: true,
                recipientProviders: [
                    [$class: 'CulpritsRecipientProvider'],
                    [$class: 'DevelopersRecipientProvider'],
                    [$class: 'RequesterRecipientProvider']
                ]
            )
        }
    }
}