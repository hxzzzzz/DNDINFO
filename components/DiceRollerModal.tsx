import React, { useState, useEffect, useRef } from 'react';
import { X, Dices, RotateCcw, Trash2, History, ChevronRight } from 'lucide-react';

interface DiceRollerModalProps {
  onClose: () => void;
}

type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

interface DieConfig {
  type: DieType;
  label: string;
  max: number;
  color: string;
  textColor: string;
}

const DICE_TYPES: DieConfig[] = [
  { type: 'd4', label: 'D4', max: 4, color: 'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20', textColor: 'text-emerald-400' },
  { type: 'd6', label: 'D6', max: 6, color: 'border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20', textColor: 'text-blue-400' },
  { type: 'd8', label: 'D8', max: 8, color: 'border-indigo-500/50 bg-indigo-500/10 hover:bg-indigo-500/20', textColor: 'text-indigo-400' },
  { type: 'd10', label: 'D10', max: 10, color: 'border-violet-500/50 bg-violet-500/10 hover:bg-violet-500/20', textColor: 'text-violet-400' },
  { type: 'd12', label: 'D12', max: 12, color: 'border-fuchsia-500/50 bg-fuchsia-500/10 hover:bg-fuchsia-500/20', textColor: 'text-fuchsia-400' },
  { type: 'd20', label: 'D20', max: 20, color: 'border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20', textColor: 'text-amber-500' },
  { type: 'd100', label: 'D100', max: 100, color: 'border-rose-500/50 bg-rose-500/10 hover:bg-rose-500/20', textColor: 'text-rose-400' },
];

interface RollResult {
  id: number;
  total: number;
  timestamp: string;
  details: {
    type: DieType;
    rolls: number[];
  }[];
  modifier: number;
}

const DiceRollerModal: React.FC<DiceRollerModalProps> = ({ onClose }) => {
  const [dicePool, setDicePool] = useState<Record<string, number>>({});
  const [modifier, setModifier] = useState<string>('0'); // String to handle empty input
  const [history, setHistory] = useState<RollResult[]>([]);
  const [currentResult, setCurrentResult] = useState<RollResult | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const addDie = (type: DieType) => {
    setDicePool(prev => ({
      ...prev,
      [type]: (prev[type] || 0) + 1
    }));
  };

  const removeDie = (type: DieType) => {
    setDicePool(prev => {
      const current = prev[type] || 0;
      if (current <= 1) {
        const { [type]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [type]: current - 1 };
    });
  };

  const clearPool = () => {
    setDicePool({});
    setModifier('0');
    setCurrentResult(null);
  };

  const rollDice = () => {
    const diceEntries = Object.entries(dicePool) as [string, number][];
    if (diceEntries.length === 0) return;

    setIsRolling(true);
    setCurrentResult(null);

    // Simulate animation delay
    setTimeout(() => {
      let grandTotal = 0;
      const details: RollResult['details'] = [];
      const modVal = parseInt(modifier) || 0;

      diceEntries.forEach(([type, count]) => {
        const dieConfig = DICE_TYPES.find(d => d.type === type)!;
        const rolls = [];
        for (let i = 0; i < count; i++) {
          const val = Math.floor(Math.random() * dieConfig.max) + 1;
          rolls.push(val);
          grandTotal += val;
        }
        details.push({ type: type as DieType, rolls });
      });

      grandTotal += modVal;

      const result: RollResult = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        total: grandTotal,
        details,
        modifier: modVal
      };

      setCurrentResult(result);
      setHistory(prev => [result, ...prev].slice(0, 10)); // Keep last 10
      setIsRolling(false);
      
      // Auto scroll to result if needed
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  const hasDice = Object.keys(dicePool).length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-800/50">
          <div className="flex items-center gap-2 text-amber-500">
            <Dices size={24} />
            <h2 className="font-heading font-bold text-lg text-white">骰子模拟器</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Result Display Area */}
          <div className="min-h-[140px] flex flex-col items-center justify-center p-6 bg-slate-950 rounded-xl border border-slate-800 shadow-inner relative overflow-hidden">
            {isRolling ? (
              <div className="flex gap-2 items-center text-amber-500 animate-pulse">
                <Dices className="animate-spin" />
                <span className="font-heading font-bold text-xl">Rolling...</span>
              </div>
            ) : currentResult ? (
              <div className="w-full animate-in slide-in-from-bottom-2 fade-in duration-300" ref={resultRef}>
                <div className="text-center mb-4">
                   <div className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-1">Total Result</div>
                   <div className="text-6xl font-heading font-bold text-amber-500 drop-shadow-lg">{currentResult.total}</div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800 text-sm space-y-2">
                  {currentResult.details.map((detail, idx) => {
                    const cfg = DICE_TYPES.find(d => d.type === detail.type)!;
                    return (
                      <div key={idx} className="flex flex-wrap items-center gap-2">
                        <span className={`font-bold ${cfg.textColor} w-10 uppercase`}>{detail.type}</span>
                        <div className="flex flex-wrap gap-1">
                          {detail.rolls.map((r, rIdx) => (
                            <span key={rIdx} className={`inline-flex items-center justify-center w-6 h-6 rounded bg-slate-800 border border-slate-700 text-slate-200 ${r === cfg.max ? 'text-amber-400 border-amber-900/50' : ''} ${r === 1 ? 'text-red-400' : ''}`}>
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {currentResult.modifier !== 0 && (
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/50">
                      <span className="font-bold text-slate-400 w-10">MOD</span>
                      <span className="text-slate-200">{currentResult.modifier > 0 ? '+' : ''}{currentResult.modifier}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-slate-600 text-center flex flex-col items-center">
                <Dices size={48} className="mb-2 opacity-20" />
                <p>选择下方的骰子开始检定</p>
              </div>
            )}
          </div>

          {/* Dice Pool Controls */}
          <div>
            <div className="flex justify-between items-end mb-3">
              <label className="text-sm font-bold text-slate-300">骰池配置</label>
              {hasDice && (
                <button onClick={clearPool} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors">
                  <Trash2 size={12} /> 清空
                </button>
              )}
            </div>

            {/* Selected Dice Pool Display */}
            <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
              {!hasDice ? (
                 <div className="w-full text-center py-2 border border-dashed border-slate-800 rounded-lg text-slate-600 text-xs italic">
                   点击下方按钮添加骰子
                 </div>
              ) : (
                Object.entries(dicePool).map(([type, count]) => {
                  const cfg = DICE_TYPES.find(d => d.type === type)!;
                  return (
                    <button 
                      key={type}
                      onClick={() => removeDie(type as DieType)}
                      className={`group flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg border ${cfg.color} transition-all`}
                    >
                      <span className={`font-bold ${cfg.textColor}`}>{cfg.label}</span>
                      <span className="bg-slate-900/50 text-white px-1.5 rounded text-xs min-w-[20px] text-center">{count}</span>
                      <X size={12} className="text-slate-400 group-hover:text-white" />
                    </button>
                  );
                })
              )}
            </div>

            {/* Dice Buttons Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-4">
              {DICE_TYPES.map((dice) => (
                <button
                  key={dice.type}
                  onClick={() => addDie(dice.type)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:border-slate-600 active:scale-95 transition-all aspect-square`}
                >
                  <span className={`text-xs font-bold ${dice.textColor}`}>{dice.label}</span>
                </button>
              ))}
            </div>

            {/* Modifier & Action */}
            <div className="flex gap-3">
              <div className="relative w-24">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">MOD</span>
                <input
                  type="number"
                  value={modifier}
                  onChange={(e) => setModifier(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-2 text-white font-bold text-center focus:border-amber-500 outline-none"
                  placeholder="0"
                />
              </div>
              <button
                onClick={rollDice}
                disabled={!hasDice || isRolling}
                className="flex-1 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20 active:scale-[0.98] transition-all"
              >
                <Dices size={20} />
                <span className="text-lg">ROLL</span>
              </button>
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-400 mb-3">
                <History size={16} />
                <span className="text-sm font-bold">历史记录</span>
              </div>
              <div className="space-y-2">
                {history.map((h) => (
                  <div key={h.id} className={`flex justify-between items-center p-3 rounded-lg border ${h === currentResult ? 'bg-amber-900/10 border-amber-500/30' : 'bg-slate-800/50 border-slate-800'}`}>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{h.timestamp}</span>
                        {h.modifier !== 0 && (
                          <span className="bg-slate-800 px-1 rounded text-[10px] border border-slate-700">
                            {h.modifier > 0 ? '+' : ''}{h.modifier}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 truncate max-w-[180px] sm:max-w-xs">
                        {h.details.map(d => `${d.rolls.length}${d.type}`).join(' + ')}
                      </div>
                    </div>
                    <div className="font-heading font-bold text-xl text-slate-200">
                      {h.total}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiceRollerModal;