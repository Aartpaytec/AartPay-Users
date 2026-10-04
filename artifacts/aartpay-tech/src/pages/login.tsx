import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useLoginUser,
  type LoginResponse,
} from "@workspace/api-client-react";
import { ArrowUpRight, CircleAlert, LockKeyhole, RefreshCw, WalletCards } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  phone: z.string().trim().min(1, "Enter your phone number."),
  password: z.string().min(1, "Enter your password."),
});

type LoginValues = z.infer<typeof loginSchema>;

type LoginPageProps = {
  onAuthenticated: (response: LoginResponse) => void;
};

export default function LoginPage({ onAuthenticated }: LoginPageProps) {
  const loginMutation = useLoginUser();
  const [serverError, setServerError] = useState("");
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: "", password: "" },
  });

  function handleSubmit(values: LoginValues) {
    setServerError("");
    loginMutation.mutate(
      { data: { phone: values.phone, password: values.password } },
      {
        onSuccess: (response) => {
          try {
            onAuthenticated(response);
          } catch {
            setServerError("This browser could not save your sign-in. Check its storage settings and try again.");
          }
        },
        onError: (error) => {
          const status =
            typeof error === "object" && error !== null && "status" in error
              ? error.status
              : undefined;
          setServerError(
            status === 401
              ? "That phone number and password do not match."
              : error instanceof Error
                ? error.message
                : "Sign-in could not be completed. Try again.",
          );
        },
      },
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand" aria-label="AartPay Tech">
          <span className="brand-mark"><WalletCards size={19} strokeWidth={1.8} /></span>
          <span>AartPay <span style={{ fontWeight: 500 }}>Tech</span></span>
        </div>
        <span className="top-status">Secure account access</span>
      </header>

      <div className="login-layout">
        <section className="intro login-intro">
          <p className="eyebrow">Welcome back</p>
          <h1>Your people,<br />ready when you are.</h1>
          <p className="intro-copy">
            Sign in to view registered profiles and manage your AartPay workspace.
          </p>
        </section>

        <section className="panel login-panel" aria-labelledby="login-heading">
          <div className="panel-head">
            <div>
              <p className="panel-kicker">Account access</p>
              <h2 className="panel-title" id="login-heading">Sign in</h2>
              <p className="panel-description">Use the phone number and password for your account.</p>
            </div>
            <span className="state-symbol login-symbol">
              <LockKeyhole size={17} />
            </span>
          </div>

          <Form {...form}>
            <form
              className="login-form"
              onSubmit={form.handleSubmit(handleSubmit)}
              noValidate
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="field">
                    <FormLabel className="field-label">Phone number</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        autoComplete="tel"
                        data-testid="input-login-phone"
                        name="phone"
                        placeholder="e.g. +234 801 234 5678"
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="field">
                    <FormLabel className="field-label">Password</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        autoComplete="current-password"
                        data-testid="input-login-password"
                        name="password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {serverError && (
                <p className="form-error" role="alert" data-testid="text-login-error">
                  <CircleAlert size={14} />
                  {serverError}
                </p>
              )}

              <button
                className="submit-button"
                data-testid="button-login"
                type="submit"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <><RefreshCw size={15} className="animate-spin" /> Signing in…</>
                ) : (
                  <>Sign in <ArrowUpRight size={16} /></>
                )}
              </button>
              <p className="form-note">
                <LockKeyhole size={12} />
                Your session is protected by short-lived access tokens.
              </p>
            </form>
          </Form>
        </section>
      </div>

      <footer className="footer-note">
        <span>AARTPAY TECH · PEOPLE FIRST</span>
        <span>Only signed-in users can view profiles</span>
      </footer>
    </main>
  );
}