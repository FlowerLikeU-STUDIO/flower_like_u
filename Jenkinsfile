pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Hello'
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