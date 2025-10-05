"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const Dashboard = () => {
  return (
    <div className="nunito-sans">
      

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Welcome back, Sarah
            </h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {/* Coins */}
            <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm p-6 flex flex-col gap-2">
              <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                Coins
              </p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-yellow-500">💰</span>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  1,250
                </p>
              </div>
            </div>

            {/* Streak */}
            <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm p-6 flex flex-col gap-2">
              <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                Streak
              </p>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-red-500">🔥</span>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  7 Days
                </p>
              </div>
            </div>
          </div>

          {/* Active Battles */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Active Battles
            </h2>

            <div className="bg-white dark:bg-background-dark rounded-xl shadow-sm p-8 text-center">
              <div className="flex flex-col items-center gap-6">
                {/* <div
                  className="bg-center bg-no-repeat aspect-video bg-contain w-full max-w-sm"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDffdi_yNpB8qr-aV-PzdE8WCwyjlhsyzvNfPVxYly3wePBlG2Q4geYNe_dYS1BIdFAufxJSJUaFEJuJ-Duc785q8iFO7OJyZsebmZg2zWgMFevdSMUKiphKjqgjlrnsOedvMLnrGaxDgRSgtMp3v8qOgzQHadjjAaLOod_Py0ZIb_eNyeEYxXAmE4j3wVsLQjverDjfhlBawlYmeNr5Ufq_UgEAaL-RdBycBCr6vaj-cD-UbnUG86OGWFps-qusl3NIlFdyzbHGbs')",
                  }}
                /> */}

                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No active battles
                  </h3>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    Start a new battle with a friend to track your habits and
                    compete!
                  </p>
                </div>

                <button className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all transform hover:scale-105">
                  <span className="mr-2">⚔️</span>
                  <span>Start New Battle</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
