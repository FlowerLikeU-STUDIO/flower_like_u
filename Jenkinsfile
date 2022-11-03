pipeline {
    agent any

    stages {
        stage('Init') {
            steps {
                sh """
                    docker stop fly_be
                    docker rm fly_be
                """
            }
        }
        stage('Frontend Dockerizing') {
            steps {
                sh "docker rmi martinflower/fly:fly_fe"
                dir('./frontend'){
                    sh "docker build -t martinflower/fly:fly_fe ."
                }
            }
        }
        stage('Backend Dockerizing') {
            steps {
                sh "docker rmi martinflower/fly:fly_be"
                dir('./backend/fly'){
                    sh "pwd"
                    sh "chmod 777 gradlew"
                    sh "./gradlew clean build"
                    sh "docker build -t martinflower/fly:fly_be ."
                }
            }
        }
        stage('Publish') {
            steps {
                sh "echo $PASSWORD | docker login -u $USERNAME --password-stdin"
                sh "docker push martinflower/fly:fly_be"
                sh "docker push martinflower/fly:fly_fe"
                sh "pwd"
            }
        }
        stage('Deploy') {             
            steps {
                sh "docker pull martinflower/fly:fly_be"
                sh "docker run -d --name fly_be -p 8080:8080 martinflower/fly:fly_be"
                sh "docker pull martinflower/fly:fly_fe"
                sh "docker run -d --name fly_fe -p 3000:3000 martinflower/fly:fly_fe"

            }
        }
    }
}