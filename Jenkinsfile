pipeline {
    agent any

    environment {
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t vue-container/vue-app:latest .
                docker push vue-container/vue-app:latest
                '''
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
                subject: "✅ SUCCESS: ${JOB_NAME} #${BUILD_NUMBER}",
                mimeType: "text/html",

                body: """
                <h2 style="color:green;">✅ Deployment Succeeded</h2>

                <table border="1" cellpadding="5">
                    <tr><td><b>Job</b></td><td>${JOB_NAME}</td></tr>
                    <tr><td><b>Build</b></td><td>#${BUILD_NUMBER}</td></tr>
                    <tr><td><b>Branch</b></td><td>${GIT_BRANCH}</td></tr>
                    <tr><td><b>Commit</b></td><td>${GIT_COMMIT}</td></tr>
                </table>

                <p>
                🔗 <a href="${BUILD_URL}console">Console Output</a>
                </p>
                """,

                recipientProviders: [
                    [$class: 'DevelopersRecipientProvider'],
                    [$class: 'RequesterRecipientProvider']
                ]
            )
        }

        failure {

            sh '''
            docker logs vue-container > docker.log || true
            '''

            emailext (
                subject: "❌ FAILED: ${JOB_NAME} #${BUILD_NUMBER}",
                mimeType: "text/html",

                body: """
                <h2 style="color:red;">🚨 Deployment Failed</h2>

                <table border="1" cellpadding="5">
                    <tr><td><b>Job</b></td><td>${JOB_NAME}</td></tr>
                    <tr><td><b>Build</b></td><td>#${BUILD_NUMBER}</td></tr>
                    <tr><td><b>Branch</b></td><td>${GIT_BRANCH}</td></tr>
                    <tr><td><b>Commit</b></td><td>${GIT_COMMIT}</td></tr>
                </table>

                <p>
                🔗 <a href="${BUILD_URL}console">Console Output</a>
                </p>
                """,

                attachLog: true,

                attachmentsPattern: "docker.log;npm-build.log",

                recipientProviders: [
                    [$class: 'DevelopersRecipientProvider'],
                    [$class: 'RequesterRecipientProvider']
                ]
            )
        }
    }
}