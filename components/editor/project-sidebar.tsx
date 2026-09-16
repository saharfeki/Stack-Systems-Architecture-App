"use client";

import { Pencil, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Project } from "@/hooks/use-project-dialogs";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onCreateProject: () => void;
  onRenameProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((project) => project.owner);
  const sharedProjects = projects.filter((project) => !project.owner);

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close project sidebar"
          onClick={onClose}
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
        />
      ) : null}

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

              <TabsContent value="my-projects" className="mt-4 flex min-h-[240px] flex-col gap-3">
                {ownedProjects.length > 0 ? (
                  ownedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-surface-border bg-subtle/60 px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-copy-primary">{project.name}</p>
                        <p className="truncate text-[11px] text-copy-muted">/{project.slug}</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="text-copy-secondary hover:bg-surface hover:text-copy-primary"
                          aria-label={`Rename ${project.name}`}
                          onClick={() => onRenameProject(project)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="text-copy-secondary hover:bg-surface hover:text-rose-400"
                          aria-label={`Delete ${project.name}`}
                          onClick={() => onDeleteProject(project)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 text-center text-copy-muted">
                    <p className="text-sm font-medium text-copy-secondary">No projects yet</p>
                    <p className="text-xs">Create a new workspace to get started.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="shared" className="mt-4 flex min-h-[240px] flex-col gap-3">
                {sharedProjects.length > 0 ? (
                  sharedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="rounded-xl border border-surface-border bg-subtle/60 px-3 py-2.5"
                    >
                      <p className="truncate text-sm font-medium text-copy-primary">{project.name}</p>
                      <p className="truncate text-[11px] text-copy-muted">/{project.slug}</p>
                    </div>
                  ))
                ) : (
                  <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 text-center text-copy-muted">
                    <p className="text-sm font-medium text-copy-secondary">No shared projects</p>
                    <p className="text-xs">Invitations will appear here.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="border-t border-surface-border p-3">
            <Button
              type="button"
              className="w-full justify-center gap-2 bg-brand text-slate-950 hover:bg-brand/90"
              onClick={onCreateProject}
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
