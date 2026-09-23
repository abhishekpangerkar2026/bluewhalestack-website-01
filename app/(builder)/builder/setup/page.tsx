import { redirect } from "next/navigation";
import { hasUsers } from "@/lib/builder/actions";
import { SetupForm } from "./SetupForm";

export const dynamic = "force-dynamic";

/** First run: create the administrator account. */
export default async function SetupPage() {
  if (await hasUsers()) redirect("/builder/login");
  return (
    <main className="grid min-h-dvh place-items-center px-5">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-lg">
        <p className="eyebrow">BlueWhale Stack</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">Set up the website builder</h1>
        <p className="mt-1 text-sm text-muted">Create the first account. It becomes the administrator, who can add the rest of the team.</p>
        <SetupForm />
      </div>
    </main>
  );
}
