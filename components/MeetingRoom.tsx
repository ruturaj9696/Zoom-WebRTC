import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";

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
        <CallControls/>
      </div>
    </div>
  );
};

export default MeetingRoom;
