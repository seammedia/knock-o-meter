interface ControlPanelProps {
  knocks: number;
  setKnocks: (val: number) => void;
  maxKnocks: number;
  isVisible?: boolean;
}

const ControlPanel = ({ knocks, setKnocks, maxKnocks, isVisible = true }: ControlPanelProps) => {
  if (!isVisible) return null;

  const increment = (amount: number) => {
    setKnocks(Math.min(maxKnocks, Math.max(0, knocks + amount)));
  };

  return (
    <div className="p-6 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl text-white font-mono w-80">
      <h3 className="text-[#ff6b00] text-xs font-bold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-[#ff6b00] rounded-full animate-pulse"></span>
        OPERATOR OVERRIDE
      </h3>

      <div className="space-y-4">
        {/* Quick Adjust */}
        <div>
          <label className="text-[10px] text-zinc-500 block mb-2">QUICK ADJUST</label>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => increment(-10)}
              className="py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded transition-colors text-sm"
            >
              -10
            </button>
            <button
              onClick={() => increment(-1)}
              className="py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded transition-colors text-sm"
            >
              -1
            </button>
            <button
              onClick={() => increment(1)}
              className="py-2 bg-[#ff6b00] hover:bg-[#e65a00] rounded text-black font-black transition-colors text-sm"
            >
              +1
            </button>
            <button
              onClick={() => increment(10)}
              className="py-2 bg-[#ff6b00] hover:bg-[#e65a00] rounded text-black font-black transition-colors text-sm"
            >
              +10
            </button>
          </div>
        </div>

        {/* Current Count Display */}
        <div className="text-center py-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
          <div className="text-[10px] text-zinc-500 mb-1">CURRENT KNOCKS</div>
          <div className="text-5xl font-black text-[#ff6b00]">{knocks}</div>
          <div className="text-[10px] text-zinc-500 mt-1">/ {maxKnocks} MAX</div>
        </div>

        {/* Slider */}
        <div>
          <label className="text-[10px] text-zinc-500 block mb-2">MANUAL CONTROL</label>
          <input
            type="range"
            min="0"
            max={maxKnocks}
            value={knocks}
            onChange={(e) => setKnocks(Number(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#ff6b00]"
          />
        </div>

        {/* Preset Buttons */}
        <div>
          <label className="text-[10px] text-zinc-500 block mb-2">PRESETS</label>
          <div className="grid grid-cols-5 gap-2">
            {[0, 25, 50, 75, 100].map((val) => (
              <button
                key={val}
                onClick={() => setKnocks(val)}
                className={`py-2 text-xs rounded transition-colors ${
                  knocks === val
                    ? 'bg-[#ff6b00] text-black font-bold'
                    : 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-600'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={() => setKnocks(0)}
          className="w-full py-3 text-[10px] bg-red-900/20 hover:bg-red-900/40 text-red-400 border border-red-900/50 rounded uppercase font-bold"
        >
          Reset Counter
        </button>

        <div className="text-[9px] text-zinc-600 border-t border-zinc-800 pt-3">
          KEYBOARD SHORTCUTS:<br />
          [+] / [-] to adjust count by 1<br />
          [H] to toggle help
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
