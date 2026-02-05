import React from 'react';
import { Book, Sword, Users, Info, Dice5 } from 'lucide-react';
import { WikiSection } from '../types';

interface NavbarProps {
  activeSection: WikiSection;
  onNavigate: (section: WikiSection) => void;
}

const NavItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-amber-600/20 text-amber-500' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    <div className={`${isActive ? 'text-amber-500' : 'group-hover:text-amber-500'} transition-colors`}>
      {icon}
    </div>
    <span className="font-medium tracking-wide text-sm">{label}</span>
  </button>
);

const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  return (
    <nav className="hidden md:flex h-16 bg-slate-900 border-b border-slate-800 items-center justify-between px-6 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-2 text-white cursor-pointer" onClick={() => onNavigate('intro')}>
         <div className="bg-amber-600 p-1.5 rounded-lg shrink-0">
           <Dice5 size={24} />
         </div>
         <div className="flex flex-col">
           <h1 className="font-heading font-bold text-lg leading-none">DND5E<span className="text-amber-500">资源不全集</span></h1>
         </div>
      </div>

      <div className="flex items-center gap-2">
          <NavItem 
            icon={<Info size={18} />} 
            label="使用须知" 
            isActive={activeSection === 'intro'} 
            onClick={() => onNavigate('intro')} 
          />
          <NavItem 
            icon={<Book size={18} />} 
            label="模组资源" 
            isActive={activeSection === 'modules'} 
            onClick={() => onNavigate('modules')} 
          />
          <NavItem 
            icon={<Sword size={18} />} 
            label="带团资源" 
            isActive={activeSection === 'dm-resources'} 
            onClick={() => onNavigate('dm-resources')} 
          />
          <NavItem 
            icon={<Users size={18} />} 
            label="玩家资源" 
            isActive={activeSection === 'player-resources'} 
            onClick={() => onNavigate('player-resources')} 
          />
      </div>
    </nav>
  );
};

export default Navbar;