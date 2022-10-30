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
                    sh "gradle clean"
                    sh "gradle bootJar"
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
                dir('./backend/fly'){
                    sh "sudo docker pull martinflower/fly"
                }
            }
        }
    }
}