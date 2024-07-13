import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import SigninButton from "./SigninButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 mb-0 bg-blue-900 py-1 shadow-sm">
      <nav className="m-auto flex max-w-6xl items-center justify-between  px-1 py-2">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={40} height={40} alt="Flow Jobs logo" />
          <span className="sm: hidden text-xl font-bold tracking-tight text-white md:block">
            Academic Jobs
          </span>
        </Link>
        <div className="flex">
          <SigninButton />
          <div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="ml-8 text-sm "
            >
              <Link href="/jobs/new">Post a job</Link>
            </Button>
          </div>

        </div>
      </nav>
    </header>
  );
}
