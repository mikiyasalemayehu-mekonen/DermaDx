import { ChevronDown } from "lucide-react";

function Select({ label, value, options, onChange, icon }: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  icon?: React.ReactNode;
}) {
  return (
    <div className="min-w-[160px]">
      <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none pl-3 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f2744]/20 cursor-pointer"
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          {icon ?? <ChevronDown className="w-4 h-4"     />}
        </span>
      </div>
    </div>
  );
}

export default Select;