pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                dir('./backend/fly'){
                    sh "pwd"
                    sh "chmod 777 gradlew"
                    sh "./gradlew clean build"
                }
            }
        }
        stage('Backend Dockerizing') {
            steps {
                sh "pwd"
                dir('./backend/fly'){
                    sh "docker build -t martinflower/fly ."
                }
            }
        }
        stage('deploy') {
            steps {
                script {
                    docker run -d -p 5000:5000 martinflower/fly
                    docker login -u $USERNAME --password-stdin
                    docker push martinflower/fly
                    docker rmi martinflower/fly
                    pwd
                }
            }
        }
    }
}