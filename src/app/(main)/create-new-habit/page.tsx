"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import appService from "@/services/app.service";
import { toast } from "sonner";

const CreateHabitBattle = () => {
  const router = useRouter();
  const [pickedHabit, setPickedHabit] = useState("");
  const [customOne, setCustomOne] = useState("");
  const [days, setDays] = useState(14);
  const [inviteMail, setInviteMail] = useState("");
  const [busy, setBusy] = useState(false);

  // this   creates a habit battle and redirect when done
  const handleBattle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const habitToUse = (customOne || pickedHabit).trim();
    if (!habitToUse) {
      toast("Pick or type a habit first, bro ");
      return;
    }

    try {
      setBusy(true);
      const res = await appService.createBattle({
        habit: habitToUse,
        duration: days,
        opponentEmail: inviteMail,
      });

      await appService.activateBattle(res.value.id, inviteMail);
      toast("Battle created successfully ⚔️");
      if (res?.value?.id) router.push(`/battle/${res.value.id}`);
    } catch (err) {
      toast(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-[#14101d] min-h-[calc(100vh-64px)]">
      <main className="max-w-2xl mx-auto px-[22px] py-[48px]">
        <div className="space-y-[26px]">
          <div className="text-center">
            <h2 className="text-[1.9rem] font-extrabold text-[#ffffff] tracking-tight">
              Start a Habit Battle ⚔️
            </h2>
            <p className="text-[13.5px] text-[#bda8ffb3] mt-[6px]">
              Choose a habit, duration & who you’re up against.
            </p>
          </div>

          <form
            onSubmit={handleBattle}
            className="bg-[#0e0a16]/60 border border-[#3a3055]/30 p-[32px] rounded-[14px] space-y-[22px]"
          >
            <div className="space-y-[18px]">
              <Select onValueChange={setPickedHabit}>
                <SelectTrigger className="w-full h-[46px] rounded-[10px] bg-[#120c22]/70 border border-[#3d335b]/40 text-white px-[14px]">
                  <SelectValue placeholder="Pick a habit" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a142a] border border-[#3d335b]/40">
                  <SelectItem value="workout">Workout</SelectItem>
                  <SelectItem value="read">Read a Book</SelectItem>
                  <SelectItem value="meditate">Meditate</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex items-center">
                <div className="flex-grow border-t border-[#3c2b63]/40"></div>
                <span className="mx-[12px] text-[#cdbdffcc] text-[13px]">or</span>
                <div className="flex-grow border-t border-[#3c2b63]/40"></div>
              </div>

              <Input
                placeholder="Type your own habit..."
                value={customOne}
                onChange={(e) => setCustomOne(e.target.value)}
                className="w-full h-[46px] border border-[#3d335b]/40 bg-[#120c22]/70 text-white rounded-[10px] px-[13px] placeholder-[#b3a2e7cc] focus:ring-[1.8px] focus:ring-[#7a5af8b3] focus:border-[#7a5af8]"
              />
            </div>

            <div className="space-y-[10px] mt-[6px]">
              <h3 className="text-[13px] font-medium text-[#c8bdf9cc]">
                Duration
              </h3>
              <div className="grid grid-cols-3 gap-[10px]">
                {[7, 14, 30].map((num) => (
                  <label key={num} className="cursor-pointer">
                    <input
                      type="radio"
                      name="days"
                      value={num}
                      className="sr-only peer"
                      checked={days === num}
                      onChange={() => setDays(num)}
                    />
                    <div className="text-center py-[7px] px-[10px] rounded-[9px] border border-[#3d335b]/40 text-[#cdbdffcc] peer-checked:border-[#8758ff] peer-checked:ring-[1.5px] peer-checked:ring-[#8758ff70] peer-checked:text-[#ffffff] font-medium transition-all">
                      {num} Days
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-[10px]">
              <h3 className="text-[13px] font-medium text-[#c8bdf9cc]">
                Invite Friend
              </h3>
              <Input
                placeholder="Opponent’s email"
                required
                value={inviteMail}
                onChange={(e) => setInviteMail(e.target.value)}
                className="w-full h-[46px] border border-[#3d335b]/40 bg-[#120c22]/70 text-white rounded-[10px] px-[13px] placeholder-[#b3a2e7cc] focus:ring-[1.8px] focus:ring-[#7a5af8b3] focus:border-[#7a5af8]"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-[46px] text-[15px] font-bold rounded-[10px] bg-[#7a5af8] hover:bg-[#6a4ce3] text-white transition-all duration-200"
            >
              {busy ? "Hold on..." : "Create Battle"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateHabitBattle;
