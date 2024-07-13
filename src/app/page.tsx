import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobListItem from "@/components/JobListItem";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { Job } from "@prisma/client";
import JobPageRight from "@/components/JobPageRight";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import JobFilterSidebarV from "@/components/JobFilterSidebarV";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    slug?: string;
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
  searchParams: { q, type, location, remote, slug },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { locationType: { search: searchString } },
          { location: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="m-auto my-0 max-w-full px-4 sm:max-w-6xl sm:px-3 lg:px-4">
      {/* <div className="mb-10 space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div> */}

      <JobFilterSidebar defaultValues={filterValues} />
      {/* <JobFilterSidebarV defaultValues={filterValues} /> */}
      <Sheet>
        <SheetTrigger>
          <Input
            type="text"
            placeholder="Search"
            className="sticky mx-auto mt-2 w-full rounded-full px-4 md:hidden"
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Job Filter</SheetTitle>
          </SheetHeader>
          <JobFilterSidebarV defaultValues={filterValues} />
        </SheetContent>
      </Sheet>

      <div className="mt-0 grid grid-cols-1 gap-1 md:grid-cols-5">
        {/* <section className="col-span-1 max-h-screen overflow-y-auto scrollbar-thin !scrollbar-thumb-gray-200 md:col-span-2"> */}
        <section
          className="col-span-1 max-h-screen overflow-y-auto scrollbar-none
                    md:col-span-2
                    md:scrollbar-thin md:scrollbar-thumb-gray-200"
        >
          <JobResults jobs={jobs} />
        </section>
        <div className=" md:col-span-3 md:block md:rounded-lg md:border md:p-5 md:hover:bg-muted/20">
          {/* Content for the remaining 3/5 of the screen on larger screens */}
          <JobPageRight jobs={jobs} />
        </div>
      </div>
    </main>
  );
}
