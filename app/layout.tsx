import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "var(--accent-primary)",
    colorPrimaryForeground: "var(--text-primary)",
    colorBackground: "var(--bg-surface)",
    colorBackgroundSecondary: "var(--bg-elevated)",
    colorText: "var(--text-primary)",
    colorTextSecondary: "var(--text-secondary)",
    colorTextMuted: "var(--text-muted)",
    colorNeutral: "var(--text-secondary)",
    colorBorder: "var(--border-default)",
    colorInputBackground: "var(--bg-subtle)",
    colorInputText: "var(--text-primary)",
    colorInputForeground: "var(--text-primary)",
    colorDanger: "var(--state-error)",
    colorSuccess: "var(--state-success)",
    colorWarning: "var(--state-warning)",
    colorAlphaShade: "var(--bg-subtle)",
    colorTextOnPrimaryBackground: "var(--text-primary)",
  },
};

export const metadata: Metadata = {
  title: "Ghost AI",
  description: "Real-time collaborative system design workspace",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base text-copy-primary">
        <ClerkProvider
          appearance={clerkAppearance}
          signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in"}
          signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up"}
          afterSignOutUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL ?? "/sign-in"}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
