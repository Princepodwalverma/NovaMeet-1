pipeline {
  agent none

  stages {
    stage('Checkout') {
      agent { docker { image 'alpine/git:latest' } }
      steps {
        checkout scm
      }
    }

    stage('Install Backend Dependencies') {
      agent { docker { image 'node:18' } }
      steps {
        dir('backend') {
          sh 'node -v'
          sh 'npm -v'
          sh 'npm ci'
        }
      }
    }

    stage('Install & Build Frontend') {
      agent { docker { image 'node:18' } }
      steps {
        dir('frontend') {
          sh 'node -v'
          sh 'npm -v'
          sh 'npm install --legacy-peer-deps'   // ya npm ci agar lockfile present
          sh 'CI=true npm run build'            // CI=true so react-scripts treats warnings as errors (optional)
        }
      }
      post {
        always {
          archiveArtifacts artifacts: 'frontend/build/**', fingerprint: true
        }
      }
    }

    stage('Docker Compose Up') {
      // ensure this node label points to a docker-capable agent (has docker daemon)
      agent { label 'docker' }
      steps {
        // run in workspace root where docker-compose.yml exists
        dir("${env.WORKSPACE}") {
          sh '''
            echo "Checking docker/compose..."
            docker --version || { echo "ERROR: docker not found on agent"; exit 125; }

            if docker compose version >/dev/null 2>&1; then
              echo "Using 'docker compose'"
              docker compose down || true
              docker compose up --build -d
            elif command -v docker-compose >/dev/null 2>&1; then
              echo "Using 'docker-compose' binary"
              docker-compose down || true
              docker-compose up --build -d
            else
              echo "ERROR: No compose available on agent. Install docker compose (v2) or docker-compose binary."
              exit 125
            fi
          '''
        }
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
