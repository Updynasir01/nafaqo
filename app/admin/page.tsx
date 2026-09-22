import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Sign in", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <LoginForm />
    </Suspense>
  );
}