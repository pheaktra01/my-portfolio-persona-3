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
}