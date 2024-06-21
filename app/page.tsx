import { CheckRequirements } from "@/components/checkSystemRequirments";
import { Instructions } from "@/components/instruction";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex justify-center flex-col items-center">
        <Instructions />
        <CheckRequirements />
      </div>
    </main>
  );
}
