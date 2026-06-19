import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <section className="relative grid h-screen w-full place-content-center overflow-hidden py-32">
        <div className="relative z-20 container flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="max-w-3xl text-5xl font-bold tracking-tighter md:text-6xl">
            Build Forms Effortlessly
          </h1>
          <p className="mb-4 max-w-xl text-muted-foreground">
            Try out this form builder built with React, DnD-Kit, Zod,
            React-Hook-Form, Zustand and Tailwind CSS.
          </p>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              className="group h-12 rounded-full px-6 text-lg"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              Sign in
            </Button>
            <Button
              className="group h-12 rounded-full px-6 text-lg"
              nativeButton={false}
              render={<Link href="/editor" />}
            >
              Create a form
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
