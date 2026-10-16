import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Adminpanel | Skvadern",
  robots: { index: false },
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      <AdminNav email={user.email ?? ""} />
      <div className="lg:pl-64">
        <main className="max-w-5xl mx-auto px-6 py-10 sm:py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
