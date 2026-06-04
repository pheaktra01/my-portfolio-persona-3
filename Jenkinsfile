pipeline {
    agent any

    environment {
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/pheaktra01/my-portfolio-persona-3.git'
            }
        }

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