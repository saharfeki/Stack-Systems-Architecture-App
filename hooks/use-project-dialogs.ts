"use client";

import { useMemo, useState } from "react";

export type Project = {
  id: string;
  name: string;
  slug: string;
  owner: boolean;
};

export type DialogKind = "create" | "rename" | "delete" | null;

const initialProjects: Project[] = [
  { id: "project-1", name: "Platform Design", slug: "platform-design", owner: true },
  { id: "project-2", name: "API Gateway", slug: "api-gateway", owner: true },
  { id: "project-3", name: "Shared Architecture Review", slug: "shared-architecture-review", owner: false },
];

export function useProjectDialogs() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeDialog, setActiveDialog] = useState<DialogKind>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [projects, selectedProjectId],
  );

  const slugify = (value: string) =>
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled-project";

  const resetDialog = () => {
    setActiveDialog(null);
    setSelectedProjectId(null);
    setDraftName("");
    setIsSubmitting(false);
  };

  const openCreateDialog = () => {
    setSelectedProjectId(null);
    setDraftName("");
    setActiveDialog("create");
    setIsSubmitting(false);
  };

  const openRenameDialog = (project: Project) => {
    setSelectedProjectId(project.id);
    setDraftName(project.name);
    setActiveDialog("rename");
    setIsSubmitting(false);
  };

  const openDeleteDialog = (project: Project) => {
    setSelectedProjectId(project.id);
    setDraftName("");
    setActiveDialog("delete");
    setIsSubmitting(false);
  };

  const createProject = () => {
    const name = draftName.trim();

    if (!name) {
      return;
    }

    setIsSubmitting(true);

    const project: Project = {
      id: `project-${Date.now()}`,
      name,
      slug: slugify(name),
      owner: true,
    };

    setProjects((current) => [project, ...current]);
    setIsSubmitting(false);
    resetDialog();
  };

  const renameProject = () => {
    const name = draftName.trim();

    if (!selectedProjectId || !name) {
      return;
    }

    setIsSubmitting(true);

    setProjects((current) =>
      current.map((project) =>
        project.id === selectedProjectId
          ? { ...project, name, slug: slugify(name) }
          : project,
      ),
    );

    setIsSubmitting(false);
    resetDialog();
  };

  const deleteProject = () => {
    if (!selectedProjectId) {
      return;
    }

    setIsSubmitting(true);
    setProjects((current) =>
      current.filter((project) => project.id !== selectedProjectId),
    );
    setIsSubmitting(false);
    resetDialog();
  };

  return {
    projects,
    activeDialog,
    selectedProject,
    draftName,
    setDraftName,
    isSubmitting,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog: resetDialog,
    createProject,
    renameProject,
    deleteProject,
    slugify,
  };
}
