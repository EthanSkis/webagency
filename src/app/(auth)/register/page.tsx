import Link from "next/link";
import { RegisterForm } from "./register-form";

export const metadata = { title: "Create your account" };

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md rounded-2xl border bg-background p-8 shadow-sm">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Access your projects, invoices, and support tickets.
      </p>

      <RegisterForm />

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
