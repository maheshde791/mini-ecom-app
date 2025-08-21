## Kubernetes Deployment Instructions

1. **Build the Docker image:**
    docker build -t frontend:latest .
    docker build -t user-service:latest .

2. **Push the image to a container registry:**


3. **Configure Kubernetes manifests:**
    - Use the provided `deploy_configs` directory for deployment files .
    - Update image references in the manifests to match your container registry.

4. **Apply the manifests:**
    ```bash
    kubectl apply -f deploy_configs/
    ```

5. **Verify deployment:**
    ```bash
    kubectl get pods
    kubectl get services
    ```

6. **Access the application:**
    - Use the frontend service's external IP or port as configured in `frontend.yaml`.

**Note:** Services communicates using nginx reverse proxy in example maheshde791/frontend-service:2.2.
