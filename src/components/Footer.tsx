import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-100">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Academic Jobs, Inc. All rights reserved.
        </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
