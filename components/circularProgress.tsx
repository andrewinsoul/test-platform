"use client;";

import { ReactNode } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgress = ({
  value,
  children,
}: {
  value: number;
  children: ReactNode;
}) => {
  return (
    <div
      style={{
        width: 35,
        height: 35,
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgressbarWithChildren
        value={value}
        styles={{
          path: {
            stroke: "#755AE2",
            strokeLinecap: "butt",
            transition: "stroke-dashoffset 0.5s ease 0s",
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
          trail: {
            stroke: "#E6E0FF",
            strokeLinecap: "butt",
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            {children}
            {/* <img
              style={{ width: 22}}
              src="https://i.imgur.com/b9NyUGm.png"
              alt="doge"
            /> */}
          </div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CircularProgress;
