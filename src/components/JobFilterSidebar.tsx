import { jobTypes } from "@/lib/job-types";
import prisma from "@/lib/prisma";
import { jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";

async function filterJobs(formData: FormData) {
  "use server";

  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);
  console.log("location:", location);
  console.log("location:", {...(location && { location })});

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
}

export default async function JobFilterSidebar() {
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
      <form action={filterJobs} className="w-full">
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
            />
          </div>
          <div className="w-full md:w-40">
            <Label htmlFor="type" className="mb-2 block">
              Type
            </Label>
            <Select id="type" name="type" defaultValue="" className="w-full">
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
              defaultValue=""
              className="w-full"
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
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <Button type="submit" className="w-full md:w-40">
            Filter Jobs
          </Button>
        </div>
      </form>
    </aside>
  );
}
