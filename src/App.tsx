import { useState } from 'react';
import { StatusIndicator } from './components/StatusIndicator';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Video,
  Music,
  Settings,
  Terminal,
  ChevronRight,
  Sparkles,
  Zap,
  Aperture
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('image');
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);

  const navigation = [
    {
      id: 'image',
      label: 'Image Generation',
      icon: ImageIcon,
      models: [
        { id: 'z-image', label: 'Z-Image', icon: Sparkles, color: 'text-yellow-400' },
        { id: 'flux', label: 'Flux', icon: Zap, color: 'text-blue-400' },
        { id: 'qwen', label: 'Qwen', icon: Aperture, color: 'text-green-400' },
      ]
    },
    {
      id: 'video',
      label: 'Video/VFX',
      icon: Video,
      models: [
        { id: 'wan2.1', label: 'Wan 2.1', icon: Video, color: 'text-pink-400' },
        { id: 'wan2.2', label: 'Wan 2.2', icon: Video, color: 'text-purple-400' },
        { id: 'ltx-2', label: 'LTX-2', icon: Video, color: 'text-red-400' },
      ]
    },
    {
      id: 'audio',
      label: 'Audio/SFX',
      icon: Music,
      models: [
        { id: 'generic', label: 'Coming Soon', icon: Music, color: 'text-gray-400' },
      ]
    },
    { id: 'manager', label: 'Node Manager', icon: LayoutDashboard },
    { id: 'logs', label: 'Console Logs', icon: Terminal },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const currentTab = navigation.find(n => n.id === activeTab);
  const currentModel = currentTab?.models?.find(m => m.id === activeSubTab) || currentTab?.models?.[0];

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden selection:bg-purple-500/30 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0F0F16] border-r border-white/5 flex flex-col shadow-2xl z-20">
        <div className="p-6 pb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent tracking-tight">
            Antigravity<span className="text-purple-500">.</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium tracking-wider mt-1 uppercase">ComfyFrontend v0.1</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.models && item.models.length > 0) setActiveSubTab(item.models[0].id);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === item.id
                    ? 'bg-purple-600/10 text-white shadow-[0_0_20px_rgba(168,85,247,0.1)] border border-purple-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.models && (
                  <ChevronRight className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${activeTab === item.id ? 'rotate-90 text-purple-500' : ''}`} />
                )}
              </button>

              {/* Sub-menu (Accordion style) */}
              {activeTab === item.id && item.models && (
                <div className="pl-12 pr-2 py-2 space-y-1 animate-in slide-in-from-top-2 fade-in duration-200">
                  {item.models.map((model) => (
                    <button
                      key={model.id}
                      onClick={(e) => { e.stopPropagation(); setActiveSubTab(model.id); }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeSubTab === model.id
                          ? 'bg-white/10 text-white'
                          : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                        }`}
                    >
                      <model.icon className={`w-3.5 h-3.5 ${model.color}`} />
                      <span>{model.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <StatusIndicator />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-[#050508]">
        {/* Ambient Backlight */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center px-8 z-10 justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              {currentModel?.label || currentTab?.label}
              {currentModel && <span className="text-sm font-normal text-slate-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">{currentTab?.label}</span>}
            </h2>
          </div>
          <div className="flex gap-4">
            {/* Placeholder for toolbar actions */}
          </div>
        </header>

        {/* Viewport content */}
        <div className="flex-1 overflow-auto p-8 relative z-0">
          {/* Dynamic Content Rendering based on structure */}
          {activeTab === 'image' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
              {/* Left: Controls */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-[#121218] border border-white/5 rounded-2xl p-6 shadow-xl">
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Prompt</label>
                  <textarea
                    className="w-full h-40 bg-[#0a0a0f] border border-white/10 rounded-xl p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none transition-all"
                    placeholder={`Describe what you want to create with ${currentModel?.label}...`}
                  />

                  <div className="mt-6 flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] active:scale-[0.98]">
                      Generate
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Gallery / Preview */}
              <div className="lg:col-span-2 bg-[#121218] border border-white/5 rounded-2xl p-1 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Sparkles className="w-10 h-10 text-slate-600" />
                  </div>
                  <p className="text-slate-500 font-medium">No images generated yet</p>
                  <p className="text-xs text-slate-600 mt-1">Queue a prompt to see magic happen</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'video' && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <h3 className="text-3xl font-bold text-white mb-2">{currentModel?.label} Engine</h3>
              <p className="text-slate-400 max-w-md mx-auto">Video generation pipeline for {currentModel?.label}. Custom node integration pending.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
