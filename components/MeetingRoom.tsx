import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import Loader from "./Loader";
import EndCallButton from "./EndCallButton";
import { useRouter, useSearchParams } from "next/navigation";

type CallLayout = "grid" | "speaker-left" | "speaker-right";
const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const [layout, setlayout] = useState<CallLayout>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(true);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  if (callingState != CallingState.JOINED)
    return (
      <div className="bg-dark-1">
        <Loader />
      </div>
    );
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
          className={`h-[calc(100vh-86px)] ${
            showParticipants ? "hidden" : "ml-2"
          }`}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls  onLeave={() => router.push(`/`)} />
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
        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
            <Users size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </div>
  );
};

export default MeetingRoom;
