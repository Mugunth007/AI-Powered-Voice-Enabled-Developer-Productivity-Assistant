import React from "react";
import { SignedOut } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./context/AppContext";
import { AuthScreen } from "./components/Auth/AuthScreen";
import { AppRoutes } from "./routes/AppRoutes";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <SignedOut>
          <div className="flex items-center justify-center min-h-screen">
            <AuthScreen />
          </div>
        </SignedOut>

        {/* Authenticated Routes */}
        <AppRoutes />
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "white",
            color: "#1C1C1E",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "1px solid #E5E5EA",
          },
        }}
      />
    </AppProvider>
  );
}
