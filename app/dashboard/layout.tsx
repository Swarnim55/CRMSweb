"use client";
import React from "react";

import "../globals.css";
import "../satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/signin");
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  console.log("sd", sessionData);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto  p-4 md:p-6 2xl:p-10">{children}</div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
      )}
    </div>
  );
}
