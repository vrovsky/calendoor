"use client";

import { PrivateNavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PrivateNavBar() {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full h-24 bg-gray-100 px-4 sm:px-8 gap-4 shadow-md mb-24">
      <Link
        href="/login"
        className="flex items-center gap-1 hover:scale-110 duration-200"
      >
        <Image src="/assets/logo.svg" width={80} height={80} alt="Logo" />
      </Link>
      <section className="sticky top-0 flex justify-beetween text-black">
        <div className="flex flex-1 max-sm:gap-0 sm:gap-4">
          {PrivateNavLinks.map((item) => {
            const isActive =
              pathname === item.route || pathname.startsWith(`${item.route}/`);
            return (
              <Link
                href={item.route}
                key={item.label}
                className={cn(
                  `flex gap-4 items-center p-4 rounded-md justify-start hover:scale-105 duration-150`,
                  isActive && "bg-blue-100 rounded-lg"
                )}
              >
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={30}
                  height={30}
                />

                <p className={cn("text-lg font-semibold max-lg:hidden")}>
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
      <div className="hover:scale-150 duration-500 ">
        <SignedIn>
          <UserButton />
          {/* I need to add a text with user name  here */}
        </SignedIn>
      </div>
    </nav>
  );
}
