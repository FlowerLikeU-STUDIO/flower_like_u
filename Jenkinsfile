pipeline {
    agent any

    stages {
        // stage('Init') {
        //     steps {
        //         sh """
        //             docker images
        //             docker stop fly
        //             docker images
        //             docker rm fly
        //             docker images
        //         """
        //     }
        // }
        // stage('Frontend Dockerizing') {
        //     steps {
        //         dir('./frontend'){
        //             sh "docker build -t martinflower/fly:fly ."
        //         }
        //     }
        // }
        stage('Backend Dockerizing') {
            steps {
                // sh "docker rmi martinflower/fly:fly"
                dir('./backend/fly'){
                    sh "pwd"
                    sh "chmod 777 gradlew"
                    sh "./gradlew clean build"
                    sh "docker build -t martinflower/fly:fly_BE ."
                }
            }
        }
        stage('Publish') {
            steps {
                sh "echo $PASSWORD | docker login -u $USERNAME --password-stdin"
                sh "docker push martinflower/fly:fly_BE"
                sh "pwd"
            }
        }
        stage('Deploy') {             
            steps {
                sh "docker pull martinflower/fly:fly_BE"
                sh "docker run -d --name fly -p 8080:8080 martinflower/fly:fly_BE"
            }
        }
    }
}