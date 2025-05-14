// app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  return <div className="p-4">Welcome to Admin Dashboard</div>;
}
