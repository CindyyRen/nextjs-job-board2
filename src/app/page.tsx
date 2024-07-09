import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobListItem from "@/components/JobListItem";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}
function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q
    ? `${q} jobs`
    : type
      ? `${type} academic jobs`
      : remote
        ? "Remote academic jobs"
        : "All academic jobs";

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`;
}

export function generateMetadata({
  searchParams: { q, type, location, remote },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Academic Jobs`,
  };
}

export default async function Home({
  searchParams: { q, type, location, remote },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="m-auto my-4 max-w-full px-4 sm:max-w-6xl sm:px-3 lg:px-4">
      {/* <div className="mb-10 space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div> */}
      <JobFilterSidebar defaultValues={filterValues} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        <section className="col-span-1 md:col-span-2">
          <JobResults filterValues={filterValues} />
        </section>
        <div className="hidden md:col-span-3 md:block md:rounded-lg md:border md:p-5 md:hover:bg-muted/20">
          {/* Content for the remaining 3/5 of the screen on larger screens */}
          00000000000
        </div>
      </div>
    </main>
  );
}
