import JobListItem from "@/components/JobListItem";
import JobFilterSidebar from "@/components/JobFilterSidebar";
import prisma from "@/lib/prisma";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="m-auto my-10 max-w-full px-4 sm:max-w-6xl sm:px-3 lg:px-4">
      <div className="mb-10 space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Academic jobs
        </h1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <JobFilterSidebar />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <section className="col-span-1 md:col-span-2">
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobListItem job={job} key={job.id} />
            ))}
          </div>
        </section>
        <div className="hidden md:col-span-3 md:block md:rounded-lg md:border md:p-5 md:hover:bg-muted/20">
          {/* Content for the remaining 3/5 of the screen on larger screens */}
          00000000000
        </div>
      </div>
    </main>
  );
}
