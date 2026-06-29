"use client";

import { loginSchema, type LoginSchemaType } from "@/lib/schemas/auth-schemas";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/server/auth/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchemaType) {
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onResponse: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          setError(ctx.error.message || ctx.error.statusText);
        },
        onSuccess: () => {
          location.replace("/");
        },
      }
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="Your email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              required
              {...field}
              aria-invalid={fieldState.invalid}
              placeholder="**********"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {error && <p className="text-sm font-medium text-danger-text">{error}</p>}

      <Button aria-disabled={isLoading} type="submit">
        {isLoading && <Loader className="animate-spin" />}
        Login
      </Button>
    </form>
  );
}
