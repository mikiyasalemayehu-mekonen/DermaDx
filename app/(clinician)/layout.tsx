import Sidebar from "./_components/sidebar";
import  Footer  from "@/components/footer";
import { ClinicianHeader } from "./_components/clinician-header";
import TopHeader from "../_components/TopHeader";

export default function ClinicianLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* <TopHeader /> */}
          <ClinicianHeader />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
