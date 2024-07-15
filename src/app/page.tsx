import JobFilterSidebar from "@/components/JobFilterSidebar";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import {
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sheet } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import JobFilterSidebarV from "@/components/JobFilterSidebarV";
import MainContent from "@/components/MainContent";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
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
  searchParams: { q, type, location, remote, page },
}: PageProps) {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  const jobsPerPage = 6;
 const currentPage = page ? parseInt(page) : undefined;
  const skip = currentPage && (currentPage - 1) * jobsPerPage;
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

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });
  const countPromise = prisma.job.count({ where });

  const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);
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

      {jobs && (
        <MainContent
          jobs={jobs}
          filterValues={filterValues}
          totalPages={Math.ceil(totalResults / jobsPerPage)}
          page={page ? parseInt(page) : undefined}
        />
      )}
    </main>
  );
}
