import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-ink-950 text-white">
      <Container>
        <div className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <p className="font-display text-7xl font-bold text-brand-500">404</p>
          <h1 className="mt-4 font-display text-2xl font-bold">
            This page drifted out of orbit.
          </h1>
          <p className="mt-3 max-w-md text-slate-400">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
          </p>
          <div className="mt-8 flex gap-3">
            <Button href="/">Back to Home</Button>
            <Button
              href="/contact"
              className="bg-white/10 text-white ring-1 ring-inset ring-white/20 hover:bg-white/15"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
