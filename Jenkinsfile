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
                sh "docker rm -f $(docker ps -aq)"
                sh "docker run -p 8080:8080 martinflower/fly:fly"
                // sh "docker run -d --name 8080 -p 8080:8080 --link mysql-container -e TZ=Asia/Seoul martinflower/fly:fly"
                // sh "ssh -o StrictHostKeyChecking=no ubuntu@k7b209.p.ssafy.io -t -t < /var/jenkins_home/workspace/fly/backend/fly/scripts/deploy.sh"
            }
        }
    }
}