import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { VoiceAssistant } from "../components/VoiceAssistant/VoiceAssistant";
import { CodeCompletion } from "../components/CodeCompletion/CodeCompletion";
import { Workflows } from "../components/Workflows/Workflows";
import { Metrics } from "../components/Metrics/Metrics";
import { ProtectedLayout } from "./ProtectedLayout";

export const viewTitles: Record<string, string> = {
  dashboard: "Dashboard",
  "voice-assistant": "Voice Assistant",
  "code-completion": "Code Assistant",
  workflows: "Workflow Automation",
  metrics: "Performance Metrics",
  settings: "Settings",
};

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Protected layout with Header + Sidebar */}
      <Route element={<ProtectedLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="voice-assistant" element={<VoiceAssistant />} />
        <Route path="code-completion" element={<CodeCompletion />} />
        <Route path="workflows" element={<Workflows />} />
        <Route path="metrics" element={<Metrics />} />
      </Route>
    </Routes>
  );
}
