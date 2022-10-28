pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'cd backend'
                sh 'cd fly'
                sh 'chmod 777 gradlew '
                sh './gradlew clean build'
                sh 'ls'
            }
        }
        // stage('Push Dockerfile') {
        //     steps {
        //         sh '''
        //         echo "Start Test"
        //         ./main
        //         '''
        //     }
        // }
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