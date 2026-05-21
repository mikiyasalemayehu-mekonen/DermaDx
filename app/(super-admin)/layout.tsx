import { redirect } from "next/navigation";
import SuperAdminSidebar from "./_components/SuperAdminSidebar";
import Footer  from "@/components/footer";
import TopHeader from "../_components/TopHeader";
// Replace this with your real session helper once lib/auth.ts is filled
// import { getSession } from "@/lib/auth";

async function getSession() {
  // TODO: replace with real JWT/cookie validation
  // For now returns mock — swap this out when backend is ready
  return { role: "super_admin", name: "Platform Admin" };
}

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // Not logged in → send to login
  if (!session) {
    redirect("/auth/login");
  }

  // Wrong role → send to their correct dashboard
  if (session.role !== "super_admin") {
    if (session.role === "clinic_admin") redirect("/dashboard");
    if (session.role === "clinician")   redirect("/dashboard");
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-surface)]">
      <div className="flex flex-1 min-h-0">
        <SuperAdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopHeader />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}