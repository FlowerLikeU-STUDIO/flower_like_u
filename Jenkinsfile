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
                    sh "docker build -t martinflower/fly:fly ."
                }
            }
        }
        stage('push') {
            steps {
                sh "echo $PASSWORD | docker login -u $USERNAME --password-stdin"
                sh "docker push martinflower/fly:fly"
                sh "docker rmi martinflower/fly:fly"
                sh "pwd"
            }
        }
        stage('pull') {
            steps {
                sh "docker pull martinflower/fly:fly"
                sh "docker run -p 8080:8080 martinflower/fly:fly"
            }
        }
    }
}
