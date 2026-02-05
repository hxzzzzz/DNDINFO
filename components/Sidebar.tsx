import React from 'react';
import { Book, Sword, Users, Info, Dice5 } from 'lucide-react';
import { WikiSection } from '../types';

interface SidebarProps {
  activeSection: WikiSection;
  onNavigate: (section: WikiSection) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NavItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
      isActive 
        ? 'bg-amber-600/20 text-amber-500 border-l-4 border-amber-500' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    <div className={`${isActive ? 'text-amber-500' : 'group-hover:text-amber-500'} transition-colors`}>
      {icon}
    </div>
    <span className="font-medium tracking-wide">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Container - Hidden on Desktop (md:hidden) */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-900/50">
           <div className="flex items-center gap-2 text-white">
             <div className="bg-amber-600 p-1.5 rounded-lg shrink-0">
               <Dice5 size={24} />
             </div>
             <div>
               <h1 className="font-heading font-bold text-lg leading-none">DND5E<span className="text-amber-500">资源不全集</span></h1>
               <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Wiki & Archive</span>
             </div>
           </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 mt-4">
          <NavItem 
            icon={<Info size={20} />} 
            label="使用须知" 
            isActive={activeSection === 'intro'} 
            onClick={() => { onNavigate('intro'); onClose(); }} 
          />
          <NavItem 
            icon={<Book size={20} />} 
            label="模组资源" 
            isActive={activeSection === 'modules'} 
            onClick={() => { onNavigate('modules'); onClose(); }} 
          />
          <NavItem 
            icon={<Sword size={20} />} 
            label="带团资源" 
            isActive={activeSection === 'dm-resources'} 
            onClick={() => { onNavigate('dm-resources'); onClose(); }} 
          />
          <NavItem 
            icon={<Users size={20} />} 
            label="玩家资源" 
            isActive={activeSection === 'player-resources'} 
            onClick={() => { onNavigate('player-resources'); onClose(); }} 
          />
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800">
           <div className="text-xs text-slate-500 text-center">
              <p>&copy; 2024 DND5E资源不全集</p>
              <p className="mt-1">Built for DND Enthusiasts</p>
           </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;