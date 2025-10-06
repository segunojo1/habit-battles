"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="nunito-sans bg-[#151022] text-white min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center h-full text-white">
        <svg
          className="text-violet-400 w-20"
          fill="none"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fill="currentColor"
            fillRule="evenodd"
            d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
          />
        </svg>
        <h1 className="nunito-sans text-3xl font-bold text-white">
          Welcome to Habit Battles
        </h1>
        <p className="text-violet-200/70">
          Join the battle of habits and see who can last the longest.
        </p>
        <Link href="/dashboard">
          <Button className=" font-bold p-4">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
