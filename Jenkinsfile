pipeline {
    agent any

    stages {
        stage('Backend Dockerizing') {
            steps {
                dir('./backend/fly'){
                    sh "pwd"
                    sh "chmod 777 gradlew"
                    sh "./gradlew clean build"
                    sh "docker build -t martinflower/fly:fly ."
                }
            }
        }
        stage('push') {
            steps {
                sh "echo $PASSWORD | docker login -u $USERNAME --password-stdin"
                sh "docker push martinflower/fly"
                sh "docker rmi martinflower/fly"
                sh "pwd"
            }
        }
        stage('pull') {
            steps {
                sh "docker pull martinflower/fly"
            }
        }
    }
}