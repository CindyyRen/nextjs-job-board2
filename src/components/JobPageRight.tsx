"use client";
import { formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";

// 动态导入 Markdown 组件，仅在客户端渲染
const Markdown = dynamic(() => import("./Markdown"), { ssr: false });

interface JobPageProps {
  job: Job;
}

export default function JobPageRight({ job }: JobPageProps) {
  if (!job) {
    return <div>Job not found</div>;
  }

  const {
    companyLogoUrl,
    applicationUrl,
    companyName,
    type,
    locationType,
    location,
    salary,
    description,
    title,
  } = job;

  return (
    <section className="relative">
      <div className="sticky top-[180px] flex justify-end">
        {applicationUrl && (
          <Button asChild className="bg-orange-500 hover:bg-orange-400">
            <a href={new URL(applicationUrl!).origin} className="w-40 md:w-fit">
              Apply now
            </a>
          </Button>
        )}
      </div>
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            alt="Company logo"
            width={100}
            height={100}
            className="rounded-xl"
          />
        )}
        <div>
          <div>
            {title && (
              <Link href={`/jobs/${job.slug}`} className="block">
                <h1 className="text-xl font-bold text-blue-800">{title}</h1>
              </Link>
            )}
            <p className="mb-3 text-sm font-semibold ">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="text-yellow-500 underline hover:no-underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {type}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {location || "Worldwide"}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(salary)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3">
        {description && <Markdown>{description}</Markdown>}
      </div>
    </section>
  );
}
