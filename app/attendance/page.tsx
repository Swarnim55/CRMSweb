"use client";
import AttandanceCalendar from "@/components/AttandanceCalendar";
import BodyCard from "@/components/Cards/BodyCard";
import React, { useState } from "react";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const AttendanceListPage = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <BodyCard>
      <>
        Attandance Calendar
        <>
          <AttandanceCalendar />
        </>
      </>
    </BodyCard>
  );
};

export default AttendanceListPage;
