"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";

const MeetingTypeList = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [value, setvalue] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  //Here we are creating the new meeting
  const createMeeting = async () => {
    if (!user || !client) {
      return;
    }
    try {
      if (!value.dateTime) {
        toast({
          title: "Please select data and time",
        });
        return;
      }
      //Generate random-id
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) {
        throw new Error("Failed to create call ! ");
      }
      const startsAt =
        value.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = value.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!value.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created Successfully !",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting !",
      });
    }
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-1"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
