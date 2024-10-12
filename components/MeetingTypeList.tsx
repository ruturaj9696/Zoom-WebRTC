"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";
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
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  
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
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px]">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible:ring-0
            focus-visible:ring-offset-0"
              onChange={(e) => {
                setvalue({ ...value, description: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px]">
              Select Date and Time
            </label>
            <DatePicker
              selected={value.dateTime}
              onChange={(date) => setvalue({ ...value, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none bg-dark-2"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created!"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link copied !",
            });
          }}
          image="./icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

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
