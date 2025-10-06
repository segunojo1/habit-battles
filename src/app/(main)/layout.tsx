import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#151022]">
      <header className="backdrop-blur-sm sticky top-0 z-10 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center gap-4">
              <div className="w-8 h-8">
                <svg
                  className="text-violet-400"
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
              </div>
              <h2 className="text-xl font-bold text-white">
                Habit Battles
              </h2>
            </div>

            {/* Center nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
              <Link href="/dashboard" className="text-violet-100 hover:text-white">Dashboard</Link>
              <Link href="/shop" className="text-violet-100 hover:text-white">Shop</Link>
              <Link href="/leaderboard" className="text-violet-100 hover:text-white">Leaderboard</Link>
            </nav>

            <div className="flex items-center gap-4">
              <button className="flex items-center justify-center rounded-full h-10 w-10 bg-black/30 border border-white/10 hover:bg-black/40 transition-colors">
                <svg
                  className="text-violet-200"
                  fill="currentColor"
                  height="24"
                  viewBox="0 0 256 256"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z" />
                </svg>
              </button>

              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>
      {children}
      <footer className="fixed bottom-0 bg-[#151022] w-full text-center py-4 text-xs text-gray-500 dark:text-gray-600 border-t border-primary/20 dark:border-primary/30">
        <p>© 2025 Habit Battles. All rights reserved.</p>
      </footer>
    </div>
  );
}
