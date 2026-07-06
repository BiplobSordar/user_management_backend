pipeline {

    agent any

    options {
        timestamps()
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                echo "========================================"
                echo "Checking out Backend Source Code..."
                echo "========================================"

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
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo ""
                    echo "========== Building Backend Image =========="

                    docker build -t backend-app .
                '''
            }
        }

        stage('Show Docker Images') {
            steps {
                sh '''
                    docker images
                '''
            }
        }

        stage('Stop Existing Container') {
            steps {
                sh '''
                    if docker ps --format '{{.Names}}' | grep -w backend-container > /dev/null
                    then
                        docker stop backend-container
                    else
                        echo "No running backend container."
                    fi
                '''
            }
        }

        stage('Remove Existing Container') {
            steps {
                sh '''
                    if docker ps -a --format '{{.Names}}' | grep -w backend-container > /dev/null
                    then
                        docker rm backend-container
                    else
                        echo "No backend container found."
                    fi
                '''
            }
        }

        stage('Run Backend Container') {
            steps {
                sh '''
                    docker run -d \
                        --name backend-container \
                        -p 5000:5000 \
                        -e NODE_ENV=production \
                        backend-app
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

        stage('Deployment Summary') {
            steps {
                sh '''
                    echo ""
                    echo "=========================================="
                    echo "Backend Deployment Successful"
                    echo "=========================================="
                    echo "Container : backend-container"
                    echo "Image     : backend-app"
                    echo "Port      : 5000"
                    echo "NODE_ENV  : production"
                    echo "=========================================="
                '''
            }
        }

    }

    post {

        success {
            echo "Backend pipeline completed successfully."
        }

        failure {
            echo "Backend pipeline failed."

            sh '''
                docker ps -a || true
                docker images || true
            '''
        }

        always {
            echo "Pipeline finished."
        }
    }

}
