"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { ProjectSummary } from "@/lib/projects";

export type DialogKind = "create" | "rename" | "delete" | null;

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "untitled-project";

const createSuffix = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().split("-")[0];
  }

  return Math.random().toString(36).slice(2, 8);
};

export function useProjectActions() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeDialog, setActiveDialog] = useState<DialogKind>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectSummary | null>(null);
  const [draftName, setDraftName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roomIdPreview = useMemo(
    () => `${slugify(draftName)}-${createSuffix()}`,
    [draftName],
  );

  const resetDialog = () => {
    setActiveDialog(null);
    setSelectedProject(null);
    setDraftName("");
    setIsSubmitting(false);
    setError(null);
  };

  const openCreateDialog = () => {
    setSelectedProject(null);
    setDraftName("");
    setError(null);
    setActiveDialog("create");
  };

  const openRenameDialog = (project: ProjectSummary) => {
    setSelectedProject(project);
    setDraftName(project.name);
    setError(null);
    setActiveDialog("rename");
  };

  const openDeleteDialog = (project: ProjectSummary) => {
    setSelectedProject(project);
    setDraftName("");
    setError(null);
    setActiveDialog("delete");
  };

  const createProject = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: draftName.trim() || "Untitled Project" }),
      });

      if (!response.ok) {
        throw new Error("Unable to create project");
      }

      const project: { id: string } = await response.json();
      resetDialog();
      router.push(`/editor/${project.id}`);
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Unable to create project");
      setIsSubmitting(false);
    }
  };

  const renameProject = async () => {
    if (!selectedProject || !draftName.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: draftName.trim() }),
      });

      if (!response.ok) {
        throw new Error("Unable to rename project");
      }

      resetDialog();
      router.refresh();
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Unable to rename project");
      setIsSubmitting(false);
    }
  };

  const deleteProject = async () => {
    if (!selectedProject) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete project");
      }

      const isActiveProject = pathname === `/editor/${selectedProject.id}`;
      resetDialog();

      if (isActiveProject) {
        router.push("/editor");
      } else {
        router.refresh();
      }
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Unable to delete project");
      setIsSubmitting(false);
    }
  };

  return {
    activeDialog,
    selectedProject,
    draftName,
    setDraftName,
    isSubmitting,
    error,
    roomIdPreview,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog: resetDialog,
    createProject,
    renameProject,
    deleteProject,
  };
}