import { prisma } from "@/lib/prisma";

export type ProjectSummary = {
  id: string;
  name: string;
  slug: string;
  owner: boolean;
};

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "untitled-project";

const toSummary = (project: { id: string; name: string }, owner: boolean): ProjectSummary => ({
  id: project.id,
  name: project.name,
  slug: slugify(project.name),
  owner,
});

export async function getProjectsForUser(userId: string, email?: string | null) {
  const [ownedProjects, sharedProjects] = await Promise.all([
    prisma.project.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true },
    }),
    email
      ? prisma.project.findMany({
          where: { collaborators: { some: { email } } },
          orderBy: { createdAt: "desc" },
          select: { id: true, name: true },
        })
      : Promise.resolve([]),
  ]);

  return {
    owned: ownedProjects.map((project) => toSummary(project, true)),
    shared: sharedProjects.map((project) => toSummary(project, false)),
  };
}

export async function getProjectForUser(projectId: string, userId: string, email?: string | null) {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { ownerId: userId },
        ...(email ? [{ collaborators: { some: { email } } }] : []),
      ],
    },
  });
}