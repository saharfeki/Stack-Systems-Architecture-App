import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { EditorWorkspace } from "@/components/editor/editor-workspace";
import { getProjectForUser, getProjectsForUser } from "@/lib/projects";

interface ProjectPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { projectId } = await params;
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const project = await getProjectForUser(projectId, userId, email);

  if (!project) {
    notFound();
  }

  const projects = await getProjectsForUser(userId, email);

  return <EditorWorkspace {...projects} />;
}
