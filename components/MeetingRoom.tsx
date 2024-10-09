import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList } from "lucide-react";

type CallLayout = "grid" | "speaker-left" | "speaker-right";
const MeetingRoom = () => {
  const [layout, setlayout] = useState<CallLayout>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
        break;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;
        break;
      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
        break;
    }
  };
  return (
    <div className="relative w-full h-screen overflow-hidden pt-4 text-white bg-dark-1 ">
      <div className="relative flex size-full justify-center items-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(true)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
        <CallControls />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "speaker-right", "speaker-left"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setlayout(item as CallLayout);
                  }}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-dark-2" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
      </div>
    </div>
  );
};

export default MeetingRoom;
