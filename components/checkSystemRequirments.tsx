import Image from "next/image";

export const CheckRequirements = () => {
  const requirments = [
    {
      hardware: "Webcam",
      icon: (
        <div className="w-[35px] h-[35px] rounded-full bg-[#E6E0FF] flex justify-center items-center">
          <Image
            src="/images/video-icon.svg"
            width={18}
            height={18}
            alt="icon"
          />
        </div>
      ),
    },
    {
      hardware: "Internet speed",
      icon: (
        <div className="w-[35px] h-[35px] rounded-full bg-[#E6E0FF] flex justify-center items-center">
          <Image src="/images/wifi.svg" width={18} height={18} alt="icon" />
        </div>
      ),
    },
    {
      hardware: "Mic",
      icon: (
        <div className="w-[35px] h-[35px] rounded-full bg-[#E6E0FF] flex justify-center items-center">
          <Image
            src="/images/video-icon.svg"
            width={18}
            height={18}
            alt="icon"
          />
        </div>
      ),
    },
    {
      hardware: "Lighting",
      icon: (
        <div className="w-[35px] h-[35px] rounded-full bg-[#E6E0FF] flex justify-center items-center">
          <Image src="/images/lighting.svg" width={18} height={18} alt="icon" />
        </div>
      ),
    },
  ];
  return (
    <div className="w-[90%] md:w-[80%] lg:w-[60%] mt-8 ">
      <section className="flex w-[70%]">
        <canvas className="border-2 border-purple-600 rounded-md w-[55%] h-[220px]">
          My video
        </canvas>
        <div className="50% flex flex-wrap gap-4 ml-12">
          {requirments.map((item) => (
            <div
              key={item.hardware}
              className="w-[45%] flex justify-center items-center flex-col rounded-md bg-[#F5F3FF]"
            >
              <div className="ml-auto pr-4 mr-2 w-[18px] h-[18px] bg-[#755AE2] rounded-full" />
              {item.icon}
              {item.hardware}
            </div>
          ))}
        </div>
      </section>
      <button className="bg-[#755AE2] rounded-md text-white p-3 mt-8">Take picture and continue</button>
    </div>
  );
};