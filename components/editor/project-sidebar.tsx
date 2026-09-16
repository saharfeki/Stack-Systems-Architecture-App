"use client";

import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      className={[
        "fixed inset-y-16 left-0 z-30 w-[320px] border-r border-surface-border bg-surface/90 backdrop-blur-sm transition-transform duration-200 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}
      aria-label="Project sidebar"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
          <h2 className="text-base font-medium text-copy-primary">Projects</h2>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="text-copy-secondary hover:bg-subtle hover:text-copy-primary"
            aria-label="Close projects sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 px-3 py-3">
          <Tabs defaultValue="my-projects" className="h-full">
            <TabsList className="grid w-full grid-cols-2 bg-subtle p-1">
              <TabsTrigger value="my-projects">My Projects</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>

            <TabsContent value="my-projects" className="mt-4 flex min-h-[240px] items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center text-copy-muted">
                <p className="text-sm font-medium text-copy-secondary">No projects yet</p>
                <p className="text-xs">Create a new workspace to get started.</p>
              </div>
            </TabsContent>

            <TabsContent value="shared" className="mt-4 flex min-h-[240px] items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-center text-copy-muted">
                <p className="text-sm font-medium text-copy-secondary">No shared projects</p>
                <p className="text-xs">Invitations will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="border-t border-surface-border p-3">
          <Button className="w-full justify-center gap-2 bg-brand text-slate-950 hover:bg-brand/90">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
    </aside>
  );
}
