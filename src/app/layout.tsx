import "./globals.css";
import { type Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Fira_Sans } from "next/font/google";

const sans = Fira_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Formbuilder",
  description:
    "FormBuilder is a powerful tool that allows you to create, customize, and manage forms effortlessly. Build everything from simple contact forms to complex surveys with our intuitive platform.",
  keywords:
    "form builder, create forms, form creator, online form tool, form generator, customizable forms, surveys, contact forms",
  robots: "index, follow",
  openGraph: {
    title: "FormBuilder - Create and Customize Forms with Ease",
    description:
      "FormBuilder is an easy-to-use online tool to create custom forms for any purpose. From contact forms to surveys, streamline your form creation process.",
  },
  twitter: {
    title: "FormBuilder - Create and Customize Forms with Ease",
    description:
      "Build and customize forms effortlessly with FormBuilder. A powerful tool for all your form creation needs.",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`antialiased ${sans.className}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
