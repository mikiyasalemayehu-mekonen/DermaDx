function AdminFooter() {
  return (
    <footer className="bg-white border-t border-slate-100 px-8 py-3 flex justify-between items-center shrink-0">
      <p className="text-[10px] text-slate-400 tracking-widest uppercase">
        For clinical decision support only. Not a diagnostic device.
      </p>
      <div className="flex gap-4">
        {["Terms of Service", "Privacy Policy"].map((t) => (
          <button key={t} className="text-[10px] text-slate-400 hover:text-slate-600 tracking-widest uppercase transition-colors">
            {t}
          </button>
        ))}
      </div>
    </footer>
  );
}

export default AdminFooter;