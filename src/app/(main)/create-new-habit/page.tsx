import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

const CreateNewHabit = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-text-light dark:text-text-dark">
              Create Challenge ⚔️
            </h2>
          </div>

          {/* Form */}
          <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-md space-y-6">
            {/* Habit Select */}
            <div className="space-y-4">
              <div>

                <Select>
                  <SelectTrigger className="w-full py-3 h-full">
                    <SelectValue placeholder="Select a habit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workout">Workout</SelectItem>
                    <SelectItem value="read-a-book">Read a book</SelectItem>
                    <SelectItem value="meditate">Meditate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative flex items-center">
                <div className="flex-grow border-t border-border-light dark:border-border-dark"></div>
                <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400 text-sm">
                  OR
                </span>
                <div className="flex-grow border-t border-border-light dark:border-border-dark"></div>
              </div>

              {/* Custom Habit */}
              <div>
                <label className="sr-only" htmlFor="custom-habit">
                  Custom habit
                </label>
                <Input
                  id="custom-habit"
                  name="custom-habit"
                  type="text"
                  required
                  placeholder="Enter a custom habit"
                  className="appearance-none relative block w-full px-3 py-3 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark placeholder-gray-500 dark:placeholder-gray-400 text-text-light dark:text-text-dark rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:ring-primary/50 focus:border-primary/50 text-base"
                />
              </div>
            </div>

            {/* Challenge Duration */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Challenge Duration
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {/* 7 Days */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value="7"
                    className="sr-only peer"
                  />
                  <div className="text-center py-2 px-3 rounded border border-border-light dark:border-border-dark text-gray-500 dark:text-gray-400 peer-checked:border-primary dark:peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/50 peer-checked:text-text-light dark:peer-checked:text-text-dark font-medium">
                    7 Days
                  </div>
                </label>

                {/* 14 Days */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value="14"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="text-center py-2 px-3 rounded border border-border-light dark:border-border-dark text-gray-500 dark:text-gray-400 peer-checked:border-primary dark:peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/50 peer-checked:text-text-light dark:peer-checked:text-text-dark font-medium">
                    14 Days
                  </div>
                </label>

                {/* 30 Days */}
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="duration"
                    value="30"
                    className="sr-only peer"
                  />
                  <div className="text-center py-2 px-3 rounded border border-border-light dark:border-border-dark text-gray-500 dark:text-gray-400 peer-checked:border-primary dark:peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/50 peer-checked:text-text-light dark:peer-checked:text-text-dark font-medium">
                    30 Days
                  </div>
                </label>
              </div>
            </div>

            {/* Invite Friend */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Invite a Friend
              </h3>
              <div>
                <label className="sr-only" htmlFor="invite-friend">
                  Invite a Friend
                </label>
                <input
                  id="invite-friend"
                  name="invite"
                  type="text"
                  required
                  placeholder="Enter username or email"
                  className="appearance-none relative block w-full px-3 py-3 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark placeholder-gray-500 dark:placeholder-gray-400 text-text-light dark:text-text-dark rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:ring-primary/50 focus:border-primary/50 text-base"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-bold rounded  "
              >
                Create Challenge
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateNewHabit;
