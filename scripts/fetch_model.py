import sys
import os
import subprocess

def install_gdown():
    try:
        import gdown
        return gdown
    except ImportError:
        print("[DOWNLOADER] Installing gdown for Google Drive support...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "gdown", "--no-warn-script-location"])
        import gdown
        return gdown

def download_file(file_id, output_path):
    gdown = install_gdown()
    url = f'https://drive.google.com/uc?id={file_id}'
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    if os.path.exists(output_path):
        print(f"[DOWNLOADER] File already exists: {output_path}")
        return

    print(f"[DOWNLOADER] Downloading to {output_path}...")
    try:
        gdown.download(url, output_path, quiet=False)
        print("[DOWNLOADER] Download complete.")
    except Exception as e:
        print(f"[ERROR] Download failed: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python fetch_model.py <gdrive_id> <relative_output_path>")
        sys.exit(1)
        
    gdrive_id = sys.argv[1]
    rel_path = sys.argv[2]
    
    # Base dir is the project root (assuming script is called from root or script dir)
    # We want to place it in backend/ComfyUI/...
    # Adjust path logic to be robust
    
    # Assuming script is run from project root, or we find the root relative to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    target_full_path = os.path.join(project_root, "backend", "ComfyUI", rel_path)
    
    download_file(gdrive_id, target_full_path)
