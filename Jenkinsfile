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

                // Get last 50 log lines (REAL Jenkins log)
                def errorLog = currentBuild.rawBuild.getLog(50).join("\n")

                emailext (
                    subject: "❌ FAILED: ${JOB_NAME} #${BUILD_NUMBER}",

                    mimeType: "text/html",

                    body: """
                    <div style="font-family:Arial; padding:15px; border:1px solid #ddd;">

                        <h2 style="color:#d9534f;">🚨 Deployment Failed</h2>

                        <table style="border-collapse:collapse; width:100%;" border="1" cellpadding="8">
                            <tr>
                                <td><b>Job</b></td>
                                <td>${JOB_NAME}</td>
                            </tr>
                            <tr>
                                <td><b>Build</b></td>
                                <td>#${BUILD_NUMBER}</td>
                            </tr>
                            <tr>
                                <td><b>Branch</b></td>
                                <td>${env.GIT_BRANCH ?: 'N/A'}</td>
                            </tr>
                        </table>

                        <h3 style="margin-top:20px;">📝 Last Commit Message</h3>
                        <div style="background:#f8f9fa; padding:10px; border-left:4px solid #007bff;">
                            <pre style="margin:0;">${commitMsg}</pre>
                        </div>

                        <h3 style="margin-top:20px;">❌ Error Log (Last 50 lines)</h3>
                        <div style="background:#fff3f3; padding:10px; border-left:4px solid #d9534f;">
                            <pre style="white-space:pre-wrap; color:#c00;">${errorLog}</pre>
                        </div>

                        <hr>

                        <p>
                            🔗 <a href="${BUILD_URL}console">View Full Console Output</a>
                        </p>

                    </div>
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