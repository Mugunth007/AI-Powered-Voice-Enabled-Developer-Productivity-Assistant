import React from "react";
import { Outlet } from "react-router-dom";
import { SignedIn, RedirectToSignIn } from "@clerk/clerk-react";
import { Header } from "../components/Layout/Header";
import { Sidebar } from "../components/Layout/Sidebar";

export function ProtectedLayout() {
  return (
    <SignedIn>
      <div className="flex min-h-screen bg-apple-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SignedIn>
  ) || <RedirectToSignIn />;
}
