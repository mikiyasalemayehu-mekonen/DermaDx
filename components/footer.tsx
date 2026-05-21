 function Footer() {
  return (
    <footer className="shrink-0 border-t border-gray-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-row flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center sm:justify-between sm:text-left">
        <p className="text-[11px] font-medium leading-5 tracking-[0.18em] uppercase text-[#0f2744]">
          © 2026 DermaCare
        </p>
        <p className="text-[11px] leading-5 text-[#0f2744]/60">
          For clinical decision support only. Not a diagnostic device.
        </p>
        <div className="flex items-center gap-4">
          {[
            "Terms of Service",
            "Privacy Policy",
          ].map((t) => (
            <button
              key={t}
              className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#0f2744]/55 transition-colors hover:text-blue-700"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;