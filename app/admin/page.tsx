import { cookies } from "next/headers";
import AdminConsole from "@/components/AdminConsole";
import LoginForm from "@/components/LoginForm";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

export const metadata = { title: "Dashboard", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const store = await cookies();
  const signedIn = await verifySession(store.get(SESSION_COOKIE)?.value);
  return signedIn ? <AdminConsole /> : <LoginForm />;
}