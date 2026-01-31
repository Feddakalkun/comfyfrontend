import { useComfyStatus } from '../hooks/useComfyStatus';

export function StatusIndicator() {
    const { isConnected, loading } = useComfyStatus();

    if (loading) return <span className="text-gray-500 text-xs">Checking...</span>;

    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`} />
            <span className={`text-xs font-medium ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
            </span>
        </div>
    );
}
