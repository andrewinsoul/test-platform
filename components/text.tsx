import React from "react";
import { twMerge } from "tailwind-merge";

const Text = (props: { children: React.ReactNode; className?: string }) => (
  <p className={twMerge(`text-[18px] font-sans ${props.className}`)}>{props.children}</p>
);

export default Text;
