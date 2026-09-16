"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

export function EditorWorkspace() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const {
    projects,
    activeDialog,
    selectedProject,
    draftName,
    setDraftName,
    isSubmitting,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    createProject,
    renameProject,
    deleteProject,
    slugify,
  } = useProjectDialogs();

  const slugPreview = slugify(draftName);

  return (
    <>
      <EditorNavbar
        sidebarOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((current) => !current)}
        title="Ghost AI"
      />

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projects}
        onCreateProject={openCreateDialog}
        onRenameProject={openRenameDialog}
        onDeleteProject={openDeleteDialog}
      />

      <Dialog open={activeDialog === "create"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>Set a descriptive name for your architecture workspace.</DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <label htmlFor="project-name" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-copy-muted">
                Project name
              </label>
              <Input
                id="project-name"
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    createProject();
                  }
                }}
                placeholder="Design system refresh"
              />
            </div>

            <div className="rounded-xl border border-surface-border bg-subtle/50 p-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-copy-muted">Slug preview</p>
              <p className="mt-2 text-sm text-copy-primary">/{slugPreview}</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-brand text-slate-950 hover:bg-brand/90"
              onClick={createProject}
              disabled={!draftName.trim() || isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "rename"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename Project</DialogTitle>
            <DialogDescription>
              Update the name for {selectedProject?.name ?? "this project"}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <label htmlFor="rename-project-name" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-copy-muted">
                Project name
              </label>
              <Input
                id="rename-project-name"
                autoFocus
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    renameProject();
                  }
                }}
                placeholder="Project name"
              />
            </div>

            <div className="rounded-xl border border-surface-border bg-subtle/50 p-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-copy-muted">Slug preview</p>
              <p className="mt-2 text-sm text-copy-primary">/{slugPreview}</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-brand text-slate-950 hover:bg-brand/90"
              onClick={renameProject}
              disabled={!draftName.trim() || isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={activeDialog === "delete"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Delete {selectedProject?.name ?? "this project"}?
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-3 text-sm text-copy-secondary">
            Deleting this project removes it from your mock workspace immediately.
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="gap-2"
              onClick={deleteProject}
              disabled={isSubmitting}
            >
              <Trash2 className="h-4 w-4" />
              {isSubmitting ? "Deleting..." : "Delete Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <main className="min-h-screen bg-base pt-16 text-copy-primary">
        <div className="relative h-[calc(100vh-4rem)] overflow-hidden bg-base">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,200,212,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(100,87,249,0.12),transparent_30%)]" />

          <div className="relative flex h-full items-center justify-center p-6">
            <div className="w-full max-w-2xl text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-copy-primary md:text-4xl">
                Create a project or open an existing one
              </h1>
              <p className="mt-3 text-sm text-copy-secondary md:text-base">
                Start a new architecture workspace, or choose a project from the sidebar.
              </p>

              <Button
                type="button"
                className="mt-8 inline-flex items-center gap-2 bg-brand text-slate-950 hover:bg-brand/90"
                onClick={openCreateDialog}
              >
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
