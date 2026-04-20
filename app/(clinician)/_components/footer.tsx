export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-8 py-3 flex justify-between items-center shrink-0">
      <p className="text-[10px] text-gray-400 tracking-widest uppercase">
        For clinical decision support only. Not a diagnostic device.
      </p>
      <div className="flex gap-4">
        {["Terms of Service", "Privacy Policy"].map((t) => (
          <button
            key={t}
            className="text-[10px] text-gray-400 hover:text-[#0f2744] tracking-widest uppercase transition-colors"
          >
            {t}
          </button>
        ))}
      </div>
    </footer>
  );
}