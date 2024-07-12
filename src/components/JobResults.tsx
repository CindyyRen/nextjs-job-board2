import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Job } from "@prisma/client";
interface JobListItemProps {
  jobs: Job[];
}

import JobListItem from "./JobListItem";

// interface JobResultsProps {
//   filterValues: JobFilterValues;
// }

export default async function JobResults({jobs}:JobListItemProps) {
  return (
    <div className="grow space-y-4">
       {jobs.map((job) => (
        // <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
        <JobListItem job={job} key={job.id} />
        // </Link>
        // <Link
        //   key={job.id}
        //   href={`${pathname}/${job.slug}?${newSearchParams.toString()}`}
        //   className="block"
        // >
        // <JobListItem job={job} />
        // </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )} 
    </div>
  );
}
