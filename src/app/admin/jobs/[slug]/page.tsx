import JobPage from "@/components/JobPage";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Session } from "inspector";
import { getServerSession } from "next-auth";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!Session || session?.user.userRole !== "JOBSEEKER") {
    throw new Error("Not authorized");
  }
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <AdminSidebar job={job} />
    </main>
  );
}
