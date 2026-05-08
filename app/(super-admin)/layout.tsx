import { redirect } from "next/navigation";

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

  return <>{children}</>;
}