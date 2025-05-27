import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function PublicNavBar() {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full h-24 bg-gray-100 px-10 gap-4 shadow-md">
      <Link
        href="/login"
        className="flex items-center gap-1 hover:scale-110 duration-200"
      >
        <Image src="/assets/logo.svg" width={80} height={80} alt="Logo" />
      </Link>
      <section className="sticky top-0 flex justify-beetween">
        <div className="flex flex-1 max-sm:gap-0 sm:gap-4">
          <SignInButton>
            <Button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-5 border border-blue-500 cursor-pointer hover:scale-110 duration-200 rounded-md shadow-xl">
              Login
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 cursor-pointer hover:scale-105 duration-200 rounded-md shadow-md"
              variant={"outline"}
            >
              Register
            </Button>
          </SignUpButton>
        </div>
      </section>
    </nav>
  );
}
