import { useState, useEffect } from 'react';
import { checkBackendStatus } from '../lib/comfyApi';

export function useComfyStatus() {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const verify = async () => {
            const status = await checkBackendStatus();
            setIsConnected(status);
            setLoading(false);
        };

        verify();
        // Poll every 5 seconds
        const interval = setInterval(verify, 5000);
        return () => clearInterval(interval);
    }, []);

    return { isConnected, loading };
}
