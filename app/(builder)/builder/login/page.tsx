import { redirect } from "next/navigation";
import { hasUsers } from "@/lib/builder/actions";
import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (!(await hasUsers())) redirect("/builder/setup");
  const { next } = await searchParams;
  return (
    <main className="grid min-h-dvh place-items-center px-5">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-lg">
        <p className="eyebrow">BlueWhale Stack</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">Website builder</h1>
        <p className="mt-1 text-sm text-muted">Sign in to edit the website.</p>
        <LoginForm next={next ?? "/builder"} />
      </div>
    </main>
  );
}
