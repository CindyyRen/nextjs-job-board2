"use client";
import React, { useEffect, useMemo, useState } from "react";

import { Job } from "@prisma/client";
import JobPageRight from "./JobPageRight";
import JobResults from "./JobResults";
import Pagination from "./Pagination";
import { JobFilterValues } from "@/lib/validation";
interface JobProps {
  jobs: Job[];
  totalPages: number;
  filterValues: JobFilterValues;
  page?: number;
}
const MainContent = ({
  jobs,
  filterValues,
  totalPages,
  page = 1,
}: JobProps) => {
  const [curPage, setCurPage] = useState("");
  useEffect(() => {
    if (jobs.length > 0) {
      setCurPage(jobs[0].slug);
    }
  }, [jobs]);

  const curJob = useMemo(() => {
    return jobs.find((job) => job.slug === curPage);
  }, [jobs, curPage]);

  return (
    <div className="mt-0 grid grid-cols-1 gap-1 md:grid-cols-5">
      {/* <section className="col-span-1 max-h-screen overflow-y-auto scrollbar-thin !scrollbar-thumb-gray-200 md:col-span-2"> */}
      <section
        className="col-span-1 max-h-screen overflow-y-auto scrollbar-none
                md:col-span-2
                md:scrollbar-thin md:scrollbar-thumb-gray-200"
      >
        <JobResults jobs={jobs} curPage={curPage} setCurPage={setCurPage} />
        <Pagination
          filterValues={filterValues}
          currentPage={page}
          totalPages={totalPages}
        />
      </section>
      <div className="hidden md:col-span-3 md:block md:rounded-lg md:border md:p-5 md:hover:bg-muted/20">
        {/* Content for the remaining 3/5 of the screen on larger screens */}
        {curJob && <JobPageRight job={curJob} />}
      </div>
    </div>
  );
};

export default MainContent;
