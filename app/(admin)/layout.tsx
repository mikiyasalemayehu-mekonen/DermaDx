import AdminFooter from "./_components/footer";

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
