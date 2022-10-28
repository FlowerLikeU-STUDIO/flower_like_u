pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    cd backend
                    cd fly
                    chmod 777 gradlew 
                    ./gradlew clean build
                    ls
                }
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