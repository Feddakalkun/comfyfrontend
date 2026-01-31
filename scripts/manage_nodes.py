import os
import sys
import json
import subprocess
import shutil

# Configuration
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
COMFYUI_DIR = os.path.join(BACKEND_DIR, "ComfyUI")
CUSTOM_NODES_DIR = os.path.join(COMFYUI_DIR, "custom_nodes")
REQUIREMENTS_FILE = os.path.join(BASE_DIR, "comfy_requirements.json")

def install_node(url, name):
    target_path = os.path.join(CUSTOM_NODES_DIR, name)
    if os.path.exists(target_path):
        print(f"[INFO] Node '{name}' already exists.")
        return

    print(f"[INSTALL] Cloning {name}...")
    try:
        subprocess.run(["git", "clone", url, target_path], check=True)
        
        # Check for requirements.txt in the node
        req_file = os.path.join(target_path, "requirements.txt")
        if os.path.exists(req_file):
            print(f"[INSTALL] Installing dependencies for {name}...")
            # Assume we are running inside the venv python, or use the venv python explicitly
            # Best effort to find the python executable
            python_exe = sys.executable 
            subprocess.run([python_exe, "-m", "pip", "install", "-r", req_file], check=True)
            
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Failed to install {name}: {e}")

def main():
    if not os.path.exists(REQUIREMENTS_FILE):
        print(f"[INFO] No {REQUIREMENTS_FILE} found. Nothing to install.")
        return

    with open(REQUIREMENTS_FILE, 'r') as f:
        data = json.load(f)

    nodes = data.get("nodes", [])
    print(f"[MANAGER] Found {len(nodes)} nodes to manage.")
    
    if not os.path.exists(CUSTOM_NODES_DIR):
        os.makedirs(CUSTOM_NODES_DIR)

    for node in nodes:
        install_node(node["url"], node["name"])

if __name__ == "__main__":
    main()
