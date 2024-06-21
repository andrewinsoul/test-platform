import Text from "./text";

export const Instructions = () => (
  <div
    className="flex w-[90%] md:w-[80%] lg:w-[60%] justify-center items-center mt-28"
  >
    <section>
      <Text className="font-bold text-lg text-[22px]">System Check</Text>
      <Text className="text-[#4A4A68] leading-[30px]">
        We utilize your camera image to ensure fairness for all participants,
        and we also employ both your camera and microphone for a video questions
        where you will be prompted to record a response using your camera or
        webcam, so it&apos;s essential to verify that your camera and microphone
        are functioning correctly and that you have a stable internet
        connection. To do this, please position yourself in front of your
        camera, ensuring that your entire face is clearly visible on the screen.
        This includes your forehead, eyes, ears, nose, and lips. You can
        initiate a 5-second recording of yourself by clicking the button below.
      </Text>
    </section>
  </div>
);
