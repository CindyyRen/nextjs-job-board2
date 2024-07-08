import { jobTypes } from "@/lib/job-types";
import prisma from "@/lib/prisma";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { Button } from "./ui/button";

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);
  console.log("location:", location);
  console.log("location:", { ...(location && { location }) });

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
}

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

export default async function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  const distinctLocations = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((locations) =>
      locations.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <aside className="sticky top-0 mb-4 h-fit space-y-4 rounded-lg border bg-background bg-blue-50 p-4">
      <form
        action={filterJobs}
        key={JSON.stringify(defaultValues)}
        className="w-full"
      >
        <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
          <div className="flex-grow">
            <Label htmlFor="q" className="mb-2 block">
              Search
            </Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, company, etc."
              className="w-full"
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="w-full md:w-40">
            <Label htmlFor="type" className="mb-2 block">
              Type
            </Label>
            <Select
              id="type"
              name="type"
              className="w-full"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="w-full md:w-40">
            <Label htmlFor="location" className="mb-2 block">
              Location
            </Label>
            <Select
              id="location"
              name="location"
              className="w-full"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center md:h-10">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="mr-2 scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <FormSubmitButton>Filter Jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
