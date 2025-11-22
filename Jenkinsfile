pipeline {
  agent none

  stages {
    stage('Checkout') {
      agent { docker { image 'alpine/git:latest' } } // सिर्फ checkout के लिए हल्का image
      steps {
        // use checkout scm or explicit repo URL with credentialsId if private
        checkout scm
        // OR, if repo is different, replace line above with:
        // git branch: 'main', url: 'https://github.com/Princepodwalverma/NovaMeet-1.git', credentialsId: 'github-creds'
      }
    }

    stage('Install & Build (Node)') {
      agent { docker { image 'node:18' } } // node environment inside container
      steps {
        sh 'node -v'
        sh 'npm -v'
        sh 'npm ci'   // npm ci is preferred for reproducible installs (if package-lock.json present)
        sh 'npm run build'
      }
      post {
        always {
          archiveArtifacts artifacts: 'build/**', fingerprint: true
        }
      }
    }

    stage('Docker Build') {
      // This stage requires docker available on the agent. Use an agent that has docker installed.
      agent { label 'docker' } // ensure you have an agent with docker (or use docker-in-docker setup)
      steps {
        script {
          def imageTag = "myapp:${env.BUILD_NUMBER}"
          // build docker image
          sh "docker build -t ${imageTag} ."
          // optional: push to registry (configure credentials / registry)
          // withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          //   sh "docker login -u $DOCKER_USER -p $DOCKER_PASS"
          //   sh "docker tag ${imageTag} myrepo/myapp:${env.BUILD_NUMBER}"
          //   sh "docker push myrepo/myapp:${env.BUILD_NUMBER}"
          // }
        }
      }
    }

    stage('Compose up (optional)') {
      agent { label 'docker' }
      when {
        expression { return fileExists('docker-compose.yml') }
      }
      steps {
        // use down then up to refresh containers
        sh "docker-compose down || true"
        sh "docker-compose up --build -d"
      }
    }
  }

  post {
    success {
      echo "Build succeeded!"
    }
    failure {
      echo "Build failed — check console output."
    }
  }
}
