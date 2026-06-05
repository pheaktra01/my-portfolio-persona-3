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

        failure {

            script {

                // Get last commit message
                def commitMsg = sh(
                    script: "git log -1 --pretty=%B",
                    returnStdout: true
                ).trim()

                // Get last error lines (clean)
                def errorLog = sh(
                    script: "tail -n 50 /var/lib/jenkins/workspace/${JOB_NAME}/console.log || true",
                    returnStdout: true
                ).trim()

                emailext (
                    subject: "❌ FAILED: ${JOB_NAME} #${BUILD_NUMBER}",
                    mimeType: "text/html",
                    body: """
                    <h2 style="color:red;">🚨 Build Failed</h2>

                    <p><b>Job:</b> ${JOB_NAME}</p>
                    <p><b>Build:</b> #${BUILD_NUMBER}</p>
                    <p><b>Branch:</b> ${GIT_BRANCH}</p>

                    <h3>📝 Last Commit Message</h3>
                    <pre>${commitMsg}</pre>

                    <h3>❌ Error Summary</h3>
                    <pre style="color:red;">${errorLog}</pre>

                    <p>
                    🔗 <a href="${BUILD_URL}console">Full Console Output</a>
                    </p>
                    """,

                    recipientProviders: [
                        [$class: 'DevelopersRecipientProvider'],
                        [$class: 'RequesterRecipientProvider']
                    ]
                )
            }
        }
    }
}