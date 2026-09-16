"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditorNavbarProps {
  sidebarOpen: boolean;
  onToggle: () => void;
  title?: string;
}

export function EditorNavbar({
  sidebarOpen,
  onToggle,
  title = "Ghost AI",
}: EditorNavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-surface-border bg-surface/95 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={onToggle}
            className="text-copy-secondary hover:bg-subtle hover:text-copy-primary"
          >
            {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
          </Button>

          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-brand" />
            <span className="text-sm font-medium text-copy-primary">{title}</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center" />

        <div className="w-10" aria-hidden="true" />
      </div>
    </header>
  );
}
