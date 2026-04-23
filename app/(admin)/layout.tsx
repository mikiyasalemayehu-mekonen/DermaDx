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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <div className="flex flex-1 min-h-0">

        <div className="flex-1 flex flex-col min-w-0">{children}</div>
      </div>
      <AdminFooter />
    </div>
  );
}
