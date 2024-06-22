"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Text from "./text";
import { Modal } from "./modal";

const Navbar = () => {
  const [time, setTime] = useState(1800);
  const [show, setShow] = useState(false);
  const converter = useCallback(
    (time: number): string =>
      `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`,
    []
  );

  useEffect(() => {
    let intervalId: number;
    if (time > 0) {
      intervalId = window.setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else {
      setShow(true)
    }
    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between px-2 lg:px-12 mt-4">
      <div>
        <div className="flex items-center">
          <Image src="/images/logo.svg" width={63} height={62} alt="logo" />
          <div className="ml-2">
            <Text className="font-bold text-[25px]">Frontend developer</Text>
            <Text className="text-[#8C8CA1]">Skill assessement test</Text>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 mt-8 md:mt-0">
        <div className="p-4 text-[#755AE2] bg-[#ECE8FF] rounded-md flex gap-2 items-center">
          <Image
            src="/images/stopwatch.svg"
            width={16}
            height={16}
            alt="stopwatch"
          />
          <span className=" font-bold text-lg">{converter(time)}</span>
          <span>time left</span>
        </div>
        <div className="bg-[#E6E0FF] w-[45px] h-[45px] p-2 rounded-full flex items-center justify-center">
          <Image src="/images/eye.svg" width={20} height={20} alt="eye" />
        </div>
      </div>
      <Modal
        show={show}
        setShow={setShow}
        body={
          <div className="flex justify-center mt-8">
            <p>Your Time is up</p>
          </div>
        }
        footer={
          <div className="flex justify-end mr-4 mb-4">
            <button className="bg-[#755AE2] text-white rounded-md px-6 p-2">Continue</button>
          </div>
        }
        title={<p>STOP!</p>}
      />
    </nav>
  );
};

export default Navbar;
