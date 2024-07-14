"use client";
import { Job } from "@prisma/client";
interface JobListItemProps {
  jobs: Job[];
  setCurPage: (slug: string) => void;
}

import JobListItem from "./JobListItem";

// interface JobResultsProps {
//   filterValues: JobFilterValues;
// }

export default function JobResults({
  jobs,
  setCurPage,
}: JobListItemProps) {
  return (
    <div className="grow space-y-4">
      {jobs.map((job) => (
        // <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
        <JobListItem job={job} key={job.id} setCurPage={setCurPage} />
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
    </div>
  );
}
