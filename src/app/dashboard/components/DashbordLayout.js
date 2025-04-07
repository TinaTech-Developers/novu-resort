import React from "react";

import { AuthProvider } from "@/app/Providers";
import Sidebar from "./Sidebar";

export default function DashbordLayout({ children }) {
  return (
    <AuthProvider>
      <div className="flex">
        <div>
          <Sidebar />
        </div>

        {children}
      </div>
    </AuthProvider>
  );
}
