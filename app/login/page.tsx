import React, { Suspense } from "react";
import { LoginForm } from "@/components/forms/login-form";
import { Metadata } from "next";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: "Login",
  description: "Create an account",
};

export default async function LoginPage() {
  const res = await auth.api.getSession({
    headers: await headers(),
  });
  if (res?.session) return redirect("/app/home");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
