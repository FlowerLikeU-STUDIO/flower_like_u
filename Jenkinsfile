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
        stage('Docker Build') {
            steps {
                sh "docker build -t martinflower/fly ."
                sh "echo $PASSWORD | docker login -u $USERNAME --password-stdin"
            }
        }
        // stage('Archive') {
        //     steps {
        //         sh '''
        //         echo "Start Archiving"
        //         mv ./main ./artifact/
        //         '''
        //         archiveArtifacts artifacts: 'artifact/*', fingerprint: true 
        //     }
        // }
    }
}