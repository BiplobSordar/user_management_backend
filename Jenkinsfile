pipeline {

    agent any

    options {
        timestamps()
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                echo "=========================================="
                echo "Checking out Backend Source Code..."
                echo "=========================================="

                checkout scm
            }
        }

        stage('Repository Information') {
            steps {
                sh '''
                    echo ""
                    echo "========== Repository =========="
                    pwd
                    ls -lah
                '''
            }
        }

        stage('Verify Docker') {
            steps {
                sh '''
                    echo ""
                    echo "========== Docker Version =========="
                    docker --version

                    echo ""
                    echo "========== Docker Information =========="
                    docker info
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo ""
                    echo "========== Building Backend Docker Image =========="

                    docker build -t backend-app .

                    echo ""
                    echo "Docker image built successfully."
                '''
            }
        }

        stage('Show Docker Images') {
            steps {
                sh '''
                    echo ""
                    echo "========== Docker Images =========="

                    docker images
                '''
            }
        }

        stage('Stop Existing Container') {
            steps {
                sh '''
                    echo ""
                    echo "========== Stopping Existing Container =========="

                    if docker ps --format "{{.Names}}" | grep -w backend-container > /dev/null
                    then
                        docker stop backend-container
                        echo "Container stopped."
                    else
                        echo "No running container found."
                    fi
                '''
            }
        }

        stage('Remove Existing Container') {
            steps {
                sh '''
                    echo ""
                    echo "========== Removing Existing Container =========="

                    if docker ps -a --format "{{.Names}}" | grep -w backend-container > /dev/null
                    then
                        docker rm backend-container
                        echo "Container removed."
                    else
                        echo "No existing container found."
                    fi
                '''
            }
        }

        stage('Run Backend Container') {
            steps {
                sh '''
                    echo ""
                    echo "========== Starting Backend Container =========="

                    docker run -d \
                        --name backend-container \
                        --env-file /var/lib/jenkins/config/backend.env \
                        -p 5000:5000 \
                        backend-app

                    echo ""
                    echo "Backend container started successfully."
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    echo ""
                    echo "========== Running Containers =========="

                    docker ps

                    echo ""
                    echo "========== Backend Logs =========="

                    docker logs backend-container || true
                '''
            }
        }

        stage('Show Backend URL') {
            steps {
                script {

                    def publicIP = sh(
                        script: 'curl -s http://169.254.169.254/latest/meta-data/public-ipv4',
                        returnStdout: true
                    ).trim()

                    echo ""
                    echo "=============================================="
                    echo "Backend Deployment Successful"
                    echo "=============================================="
                    echo "Server Public IP : ${publicIP}"
                    echo "Backend URL      : http://${publicIP}:5000"
                    echo "API Base URL     : http://${publicIP}:5000/api/v1"
                    echo "=============================================="
                }
            }
        }

        stage('Deployment Summary') {
            steps {
                sh '''
                    echo ""
                    echo "=============================================="
                    echo "Deployment Completed Successfully"
                    echo "=============================================="
                    echo "Container Name : backend-container"
                    echo "Image Name     : backend-app"
                    echo "Container Port : 5000"
                    echo "Host Port      : 5000"
                    echo "Environment    : Production"
                    echo "=============================================="
                '''
            }
        }

    }

    post {

        success {

            echo "Pipeline executed successfully."

        }

        failure {

            echo "Pipeline failed."

            sh '''
                echo ""
                echo "========== Docker Containers =========="
                docker ps -a || true

                echo ""
                echo "========== Docker Images =========="
                docker images || true
            '''
        }

        always {

            echo "Pipeline execution finished."

        }
    }

}
