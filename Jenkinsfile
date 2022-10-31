pipeline {
    agent any

    stages {
        stage('Build') {
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
                sh "docker images"
                sh "echo $PASSWORD | docker login -u $USERNAME --password-stdin"
                sh "docker images"
                sh "docker push martinflower/fly:fly"
                sh "docker images"
                sh "pwd"
            }
        }
        stage('Deploy') {             
            steps {
                sh "docker stop fly"
                sh "docker images"
                sh "docker rm fly"
                sh "docker images"
                sh "docker rmi martinflower/fly:fly"
                sh "docker images"
                sh "docker pull martinflower/fly:fly"
                sh "docker images"
                sh "docker run -d --name fly -p 8080:8080 martinflower/fly:fly"
                sh "docker images"
            }
        }
    }
}