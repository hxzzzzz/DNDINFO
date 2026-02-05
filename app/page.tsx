'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Search, ScrollText, Filter, Menu, ExternalLink, Loader2, Info } from 'lucide-react';
import { STATIC_CONTENT } from '../constants';
import ModuleCard from '../components/ModuleCard';
import ModuleDetailsModal from '../components/ModuleDetailsModal';
import DiceRollerModal from '../components/DiceRollerModal';
import PointBuyModal from '../components/PointBuyModal';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { ModuleData, WikiSection } from '../types';
import * as api from '../services/api';

// Markdown-ish renderer for static content
const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
  const lines = content.split('\n');
  return (
    <div className="space-y-4 text-slate-300 leading-relaxed break-words">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('### ')) return <h2 key={idx} className="text-xl sm:text-2xl font-heading font-bold text-white mt-6 mb-3">{trimmed.replace('### ', '')}</h2>;
        if (trimmed.startsWith('#### ')) return <h3 key={idx} className="text-lg sm:text-xl font-heading font-bold text-amber-500 mt-4 mb-2">{trimmed.replace('#### ', '')}</h3>;
        if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ')) return <div key={idx} className="ml-4 font-bold text-slate-200">{trimmed}</div>;
        if (!trimmed) return <div key={idx} className="h-2"></div>;

        // Simple Markdown Link Parser [text](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
        const match = trimmed.match(linkRegex);
        
        if (match) {
           const [full, text, url] = match;
           const index = trimmed.indexOf(full);
           const before = trimmed.substring(0, index);
           const after = trimmed.substring(index + full.length);
           return (
             <p key={idx} className="text-sm sm:text-base">
               {before}
               <a href={url} target="_blank" rel="noopener noreferrer" className="text-amber-500 underline hover:text-amber-400 font-bold">
                 {text}
               </a>
               {after}
             </p>
           );
        }

        return <p key={idx} className="text-sm sm:text-base">{trimmed}</p>;
      })}
    </div>
  );
};

interface ResourceListProps {
  items: {name: string, desc: string, url: string}[];
  onAction?: (url: string) => void;
}

const ResourceList: React.FC<ResourceListProps> = ({ items, onAction }) => (
  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
    {items.map((item, idx) => (
      <a 
        key={idx} 
        href={item.url} 
        target={item.url.startsWith('#') ? undefined : "_blank"}
        rel={item.url.startsWith('#') ? undefined : "noopener noreferrer"}
        onClick={(e) => {
          if (item.url.startsWith('#') && onAction) {
            e.preventDefault();
            onAction(item.url);
          }
        }}
        className="block bg-slate-800 border border-slate-700 p-4 sm:p-5 rounded-xl hover:border-amber-600/50 hover:bg-slate-700 transition-all group cursor-pointer"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-base sm:text-lg text-slate-200 group-hover:text-amber-500 transition-colors">{item.name}</h3>
          <ExternalLink size={16} className="text-slate-500 group-hover:text-amber-500" />
        </div>
        <p className="text-xs sm:text-sm text-slate-400">{item.desc}</p>
      </a>
    ))}
  </div>
);

const DragonVaultApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState<WikiSection>('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Data State
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Modal State
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
  const [isDiceOpen, setIsDiceOpen] = useState(false);
  const [isPointBuyOpen, setIsPointBuyOpen] = useState(false);

  // 1. LOAD DATA FROM API
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await api.fetchModules();
        setModules(data);
      } catch (error) {
        console.error("Failed to load modules:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    modules.forEach(m => m.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [modules]);

  // Filter Modules
  const filteredModules = useMemo(() => {
    return modules.filter(module => {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch = 
        module.title.toLowerCase().includes(lowerSearch) ||
        module.summary.toLowerCase().includes(lowerSearch) ||
        module.setting.toLowerCase().includes(lowerSearch) || 
        module.styleLabel.toLowerCase().includes(lowerSearch);
      
      const matchesTag = selectedTag ? module.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [modules, searchTerm, selectedTag]);

  const handleResourceAction = (url: string) => {
    if (url === '#dice-roller') {
      setIsDiceOpen(true);
    } else if (url === '#point-buy') {
      setIsPointBuyOpen(true);
    }
  };

  return (
    <div className="min-h-screen font-body bg-[#0f172a] text-slate-200 flex flex-col overflow-x-hidden">
      
      {/* Desktop Navigation (Top Bar) */}
      <Navbar 
        activeSection={activeSection} 
        onNavigate={setActiveSection} 
      />

      {/* Mobile Sidebar (Drawer) */}
      <Sidebar 
        activeSection={activeSection} 
        onNavigate={setActiveSection} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative w-full max-w-[100vw] overflow-x-hidden">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="md:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-400 active:text-white">
              <Menu size={24} />
            </button>
            <span className="font-heading font-bold text-lg">DND5E资源不全集</span>
          </div>
        </div>

        {/* Content Render */}
        <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto w-full">
          
          {/* SECTION: INTRO (Home) */}
          {activeSection === 'intro' && (
            <div className="animate-in fade-in duration-300">
               <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                 <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white">
                   {STATIC_CONTENT.intro.title}
                 </h1>
               </div>
               
               <div className="prose prose-invert max-w-none">
                 <MarkdownContent content={STATIC_CONTENT.intro.content} />
               </div>
            </div>
          )}

          {/* SECTION: DM RESOURCES */}
          {activeSection === 'dm-resources' && (
            <div className="animate-in fade-in duration-300">
               <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white mb-6 border-b border-slate-700 pb-4">
                 {STATIC_CONTENT.dmResources.title}
               </h1>
               <ResourceList items={STATIC_CONTENT.dmResources.items} />
            </div>
          )}

           {/* SECTION: PLAYER RESOURCES */}
           {activeSection === 'player-resources' && (
            <div className="animate-in fade-in duration-300">
               <h1 className="text-2xl sm:text-4xl font-heading font-bold text-white mb-6 border-b border-slate-700 pb-4">
                 {STATIC_CONTENT.playerResources.title}
               </h1>
               <ResourceList items={STATIC_CONTENT.playerResources.items} onAction={handleResourceAction} />
            </div>
          )}

          {/* SECTION: MODULES LIBRARY */}
          {activeSection === 'modules' && (
            <div className="animate-in fade-in duration-300 space-y-6">
              
              <div className="flex flex-col gap-4 border-b border-slate-800 pb-6">
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">模组档案馆</h1>
                
                {/* Pinned Note */}
                <div className="bg-amber-900/20 border border-amber-900/50 p-3 rounded-lg flex items-start gap-3 text-amber-200/80 text-sm shadow-sm">
                   <Info className="shrink-0 mt-0.5" size={16} />
                   <p className="font-medium">{STATIC_CONTENT.modulesNote}</p>
                </div>
                
                {/* Search & Stats */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mt-2">
                   <div className="relative w-full sm:w-96">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                      <input 
                        type="text" 
                        placeholder="搜索模组..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:border-amber-600 outline-none transition-all text-sm sm:text-base placeholder:text-sm"
                      />
                   </div>
                   <div className="flex items-center gap-2 text-slate-400 text-sm whitespace-nowrap">
                     <ScrollText size={16} />
                     <span>收录 {filteredModules.length} 篇</span>
                   </div>
                </div>

                {/* Filter Tags */}
                <div className="w-full overflow-hidden">
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide mask-linear-fade touch-pan-x">
                    <Filter size={16} className="text-slate-500 min-w-[16px] shrink-0" />
                    <button 
                      onClick={() => setSelectedTag(null)}
                      className={`px-3 py-1 text-xs sm:text-sm rounded-full whitespace-nowrap transition-colors shrink-0 ${selectedTag === null ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                      全部
                    </button>
                    {allTags.map(tag => (
                      <button 
                      key={tag}
                      onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                      className={`px-3 py-1 text-xs sm:text-sm rounded-full whitespace-nowrap transition-colors shrink-0 ${selectedTag === tag ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
                    >
                      {tag}
                    </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4">
                  <Loader2 className="animate-spin text-amber-500" size={40} />
                  <p>正在查阅卷宗...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredModules.map(module => (
                    <ModuleCard 
                      key={module.id} 
                      module={module} 
                      onClick={setSelectedModule} 
                    />
                  ))}
                  {filteredModules.length === 0 && (
                    <div className="col-span-full text-center py-20 text-slate-500">
                      <p>未找到匹配的模组。</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* Detail Modal with Comments */}
      {selectedModule && (
        <ModuleDetailsModal 
          module={selectedModule} 
          onClose={() => setSelectedModule(null)} 
        />
      )}

      {/* Dice Simulator Modal */}
      {isDiceOpen && (
        <DiceRollerModal onClose={() => setIsDiceOpen(false)} />
      )}

      {/* Point Buy Calculator Modal */}
      {isPointBuyOpen && (
        <PointBuyModal onClose={() => setIsPointBuyOpen(false)} />
      )}
    </div>
  );
};

export default DragonVaultApp;