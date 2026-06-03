import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "CogniPlan - AI Student Planner",
  description: "An AI-powered student planner using Gemini 2.5 Pro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-gray-900 selection:bg-[#6366f1] selection:text-white flex">
        <Sidebar />
        <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-1 p-8 bg-white">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
