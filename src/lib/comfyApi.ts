export const COMFY_API_URL = "http://127.0.0.1:8188";

export async function checkBackendStatus(): Promise<boolean> {
    try {
        const res = await fetch(`${COMFY_API_URL}/system_stats`);
        return res.ok;
    } catch (e) {
        return false;
    }
}

export async function checkBackendConnection(): Promise<{ connected: boolean; message?: string }> {
    try {
        const response = await fetch(`${COMFY_API_URL}/system_stats`);
        if (response.ok) {
            return { connected: true };
        }
        return { connected: false, message: `Status: ${response.status}` };
    } catch (error) {
        return { connected: false, message: "Connection to ComfyUI backend failed. Make sure it is running." };
    }
}
