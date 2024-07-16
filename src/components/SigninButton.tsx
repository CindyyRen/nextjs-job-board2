"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogoutButton } from "./logout-button";

const SigninButton = () => {
  const { data: session } = useSession();
  const userRole = session?.user?.userRole ?? "defaultRole";
  return (
    <div className="flex items-center gap-2 ">
      {session && session.user ? (
        <>
          {/* <Link
            href={'/profile'}
          >{`${session.user.firstName} ${session.user.lastName}`}</Link> */}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-9 w-9 !bg-purple-500">
                <AvatarImage src={session.user?.image || ""} />
                <AvatarFallback className="bg-sky-500">
                  <User className="text-white" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}

            <DropdownMenuContent className="w-60" align="end">
              <DropdownMenuItem>{`${session.user.email}`}</DropdownMenuItem>
              <DropdownMenuSeparator />

              {userRole == "JOBSEEKER" ? (
                <Link href="/admin">
                  <DropdownMenuItem>Admin</DropdownMenuItem>
                </Link>
              ) : (
                <Link href="/">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
              )}

              <Link href="/settings">
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <LogoutButton>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Badge
            onClick={() => signIn()}
            variant="outline"
            className="text-sm text-white"
          >
            Sign In
          </Badge>
          <Link href={"/auth/signup"} className="text-sm text-white">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default SigninButton;
