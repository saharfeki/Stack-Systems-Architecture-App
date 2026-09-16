"use client";

import { useState } from "react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";

export function EditorWorkspace() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <EditorNavbar
        sidebarOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((current) => !current)}
        title="Ghost AI"
      />

      <ProjectSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="min-h-screen bg-base pt-16 text-copy-primary">
        <div className="relative h-[calc(100vh-4rem)] overflow-hidden bg-base">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,200,212,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(100,87,249,0.12),transparent_30%)]" />

          <div className="relative flex h-full items-center justify-center p-6">
            <div className="w-full max-w-2xl rounded-3xl border border-surface-border bg-surface/80 p-10 text-center shadow-2xl shadow-black/20 backdrop-blur-sm">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-copy-muted">
                Workspace
              </p>
              <h1 className="mt-4 text-3xl font-semibold text-copy-primary">
                Canvas ready for system design
              </h1>
              <p className="mt-3 text-sm text-copy-secondary">
                The editor shell and auth flow are active, ready for the next design
                workspace steps.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
