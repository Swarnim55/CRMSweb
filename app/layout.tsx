"use client";
import "./globals.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
export interface ProvidersProps {
  children: React.ReactNode;
  session?: Session;
}

export default function RootLayout({ children, session }: ProvidersProps) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex items-center justify-center h-screen">
              <main>
                <SessionProvider session={session}>
                  <div>{children}</div>
                </SessionProvider>
              </main>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
