
pipeline {
    agent any

    environment {
        ANSIBLE_HOST_KEY_CHECKING = 'False'
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t yagami168/vue-app:latest .
                docker push yagami168/vue-app:latest
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

        stage('Fetch Server Report') {
            steps {
                sh '''
                scp -i ~/.ssh/ubuntu_key \
                    -o StrictHostKeyChecking=no \
                    ubuntu@13.54.88.26:/tmp/server_report.txt .
                '''
            }
        }
    }

    post {

        success {

            script {
                REPORT = readFile('server_report.txt')
            }

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

                <h3>📊 Server Health</h3>

                <pre>
${REPORT}
                </pre>

                <p>
                🔗 <a href="${BUILD_URL}console">Console Output</a>
                </p>
                """,

                attachmentsPattern: "server_report.txt",

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

                <p>Deployment failed. Check attached logs.</p>

                <p>
                🔗 <a href="${BUILD_URL}console">Console Output</a>
                </p>
                """,

                attachLog: true,

                attachmentsPattern: "docker.log",

                recipientProviders: [
                    [$class: 'DevelopersRecipientProvider'],
                    [$class: 'RequesterRecipientProvider']
                ]
            )
        }
    }
}