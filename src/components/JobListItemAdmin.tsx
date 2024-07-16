"use client";
import placeholder from "@/assets/placeholder.png";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Badge from "./Badge";
import clsx from "clsx";

interface JobListItemProps {
  job: Job;
}

export default function JobListItem({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
    slug,
  },
}: JobListItemProps) {
  // const searchParams = useSearchParams();
  // const newSearchParams = new URLSearchParams(searchParams);
  // newSearchParams.set("slug", slug);
  // const currentSlug = searchParams.get("slug");

  // console.log("companyLogoUrl", companyLogoUrl);
  const jobContent = (
    <article
      className={clsx("flex gap-3 rounded-lg border p-5 hover:bg-muted/60")}
    >
      <div className="hidden md:flex md:flex-col md:gap-3">
        {
          <Image
            // src={companyLogoUrl || placeholder}
            src={placeholder}
            alt={`${companyName} logo`}
            width={60}
            height={60}
            className="self-center rounded-lg"
          />
        }
        <Badge>{type}</Badge>
      </div>
      <div className="flex-grow space-y-3">
        <div>
          {title && <h2 className="font-medium">{title}</h2>}
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <Globe2 size={16} className="shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(salary)}
          </p>
          <p className="flex items-center gap-1.5 text-sm">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>
    </article>
  );

  return (
    <>
      <div>
        <Link href={`/admin/jobs/${slug}`} className="block">
          {jobContent}
        </Link>
      </div>
    </>
  );
}
