import React, { useState, useMemo } from 'react';
import { Search, Sparkles, ScrollText, Filter, Dice5 } from 'lucide-react';
import { MOCK_MODULES } from './constants';
import ModuleCard from './components/ModuleCard';
import AiAssistant from './components/AiAssistant';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags for filter dropdown
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    MOCK_MODULES.forEach(m => m.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  // Filter Logic
  const filteredModules = useMemo(() => {
    return MOCK_MODULES.filter(module => {
      const matchesSearch = 
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.summary.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = selectedTag ? module.tags.includes(selectedTag) : true;

      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  return (
    <div className="min-h-[100dvh] font-body flex flex-col relative pb-safe-bottom">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black -z-10"></div>

      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-md pt-safe-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer active:opacity-70 transition-opacity" onClick={() => {setSearchTerm(''); setSelectedTag(null)}}>
              <div className="bg-amber-600 p-1.5 rounded-lg text-white">
                <Dice5 size={24} />
              </div>
              <h1 className="text-2xl font-heading font-bold text-slate-100 tracking-wide hidden sm:block">
                Dragon<span className="text-amber-500">Vault</span>
              </h1>
            </div>

            {/* Search Bar - Desktop/Tablet */}
            <div className="flex-1 max-w-lg mx-4 hidden sm:block">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-full leading-5 bg-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 sm:text-sm transition-all"
                  placeholder="搜索标题、作者或主题..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* AI Toggle Button */}
            <button
              onClick={() => setIsAiOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-amber-900/50 hover:shadow-amber-600/30 transition-all transform hover:scale-105"
            >
              <Sparkles size={18} />
              <span className="hidden md:inline">询问档案馆员</span>
              <span className="md:hidden">AI</span>
            </button>
          </div>
          
          {/* Mobile Search Bar (visible only on small screens) */}
          <div className="sm:hidden pb-4">
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="search"
                  className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg bg-slate-800 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-base"
                  placeholder="搜索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{fontSize: '16px'}} // Prevents iOS zoom
                />
              </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Filters and Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-2 text-slate-400">
             <ScrollText size={18} />
             <span>共 <span className="text-white font-bold">{filteredModules.length}</span> 个模组</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0 scrollbar-hide w-full sm:w-auto mask-linear-fade">
            <Filter size={18} className="text-slate-500 min-w-fit" />
            <button 
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${selectedTag === null ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 active:bg-slate-700'}`}
            >
              全部
            </button>
            {allTags.map(tag => (
               <button 
               key={tag}
               onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
               className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors ${selectedTag === tag ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 active:bg-slate-700'}`}
             >
               {tag}
             </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredModules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-safe-bottom">
            {filteredModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <Dice5 size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl font-heading">档案中未找到相关模组。</p>
            <p className="text-sm mt-2">尝试调整搜索词或询问档案馆员。</p>
          </div>
        )}
      </main>

      {/* AI Assistant Sidebar */}
      <AiAssistant 
        isOpen={isAiOpen} 
        onClose={() => setIsAiOpen(false)} 
        modules={MOCK_MODULES}
      />
      
      {/* Overlay for AI Sidebar (Mobile mainly) */}
      {isAiOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 touch-none"
          onClick={() => setIsAiOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;