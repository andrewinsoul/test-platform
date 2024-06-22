/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Image from "next/image";
import NetworkSpeed from "network-speed";
import { Modal } from "./modal";

export const CheckRequirements = () => {
  const [videoTag, setVideoTag] = useState<null | HTMLVideoElement>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [videoMode, setVideoMode] = useState(true);
  const [videoAudioPermission, setVideoAudioPermission] = useState(false);
  const [lighting, setLighting] = useState(false);
  const [brightnessIndex, setBrightnessIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [faceDetections, setFaceDetections] = useState<
    faceapi.FaceDetection[] | []
  >([]);
  const [mediaStreamTracks, setMediaStreamTracks] = useState<
    null | MediaStreamTrack[]
  >(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [idInterval, setIdInterval] = useState(null);
  const requestRef = useRef<number>(0);

  const testNetworkSpeed = new NetworkSpeed();

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      setModelLoaded(true);
    };
    loadModels();
  }, []);

  useEffect(() => {
    const loadMediaRequirements = async () => {
      try {
        const localMediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setVideoAudioPermission(true);
        setMediaStreamTracks(localMediaStream.getTracks());

        if (videoRef?.current) {
          videoRef.current.srcObject = localMediaStream;
          setVideoTag(videoRef.current);
        }
      } catch (err) {
        setVideoAudioPermission(false);
      }
    };

    const handleVideoPlay = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (canvas) {
        canvas.width = video?.videoWidth as number;
        canvas.height = video?.videoHeight as number;
      }

      const intervalId = setInterval(async () => {
        if (video) {
          const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions()
          );
          setFaceDetections(detections);
          if (detections.length) {
            setLighting(true);
          }
          canvas &&
            canvas
              .getContext("2d")
              ?.clearRect(0, 0, canvas.width, canvas.height);
        }
      }, 100);
      // @ts-ignore
      setIdInterval(intervalId);
    };

    if (modelLoaded) {
      loadMediaRequirements().then(() => {
        handleVideoPlay();
      });
    }
  }, [modelLoaded]);

  useEffect(() => {
    if (!videoMode) {
      mediaStreamTracks?.forEach((x) => x.stop());
    }
  }, [videoMode, mediaStreamTracks, videoTag]);

  useEffect(() => {
    const getSpeed = async () => {
      const baseUrl = "https://eu.httpbin.org/stream-bytes/500000";
      const fileSizeInBytes = 500000;
      const speed = await testNetworkSpeed.checkDownloadSpeed(
        baseUrl,
        fileSizeInBytes
      );
      console.log(speed);
    };
    getSpeed();
  }, []);

  useEffect(() => {
    const calculateFrameBrightness = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const videoElem = videoRef.current;
      canvas.width = videoElem?.videoWidth || 400;
      canvas.height = videoElem?.videoHeight || 400;

      videoElem &&
        ctx?.drawImage(videoElem, 200, 200, canvas.width, canvas.height);
      const imageData = ctx?.getImageData(
        200,
        200,
        canvas.width,
        canvas.height
      );

      const avgBrightness = calculateBrightness(imageData);
      setBrightnessIndex(avgBrightness);

      requestRef.current = requestAnimationFrame(calculateFrameBrightness);
    };
    // calculateFrameBrightness(); undo later
  }, []);

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

  function calculateBrightness(imageData: any) {
    const pixels = imageData.data;
    let sum = 0;
    console.log(pixels.length, "cpy");
    for (let i = 0; i < pixels.length; i += 4) {
      const brightness =
        0.34 * pixels[i] + 0.5 * pixels[i + 1] + 0.16 * pixels[i + 2];
      sum += brightness;
    }

    const avgBrightness = sum / (pixels.length / 4);

    return avgBrightness;
  }

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[60%] mt-8">
      <section className="flex w-full flex-col md:flex-row">
        <video
          autoPlay
          ref={videoRef}
          className="border-2 border-purple-600 rounded-md w-full w-[] h-[220px]"
        >
          My video
        </video>
        <canvas ref={canvasRef} className="absolute" />
        <div className="w-full flex flex-wrap gap-4 ml-0 mt-4 md:mt-0 justify-between md:ml-12">
          {requirments.map((item) => (
            <div
              key={item.hardware}
              className="w-[47%] flex justify-center items-center flex-col rounded-md bg-[#F5F3FF]"
            >
              {item.hardware === "Mic" && videoAudioPermission ? (
                <div className="ml-auto mr-2">
                  <Image
                    src="/images/mic.svg"
                    width={16}
                    height={16}
                    alt="mic"
                  />
                </div>
              ) : item.hardware === "Webcam" && faceDetections.length ? (
                <div className="ml-auto mr-2">
                  <Image
                    src="/images/video-icon.svg"
                    width={16}
                    height={16}
                    alt="mic"
                  />
                </div>
              ) : item.hardware === "Lighting" && lighting ? (
                <div className="ml-auto mr-2">
                  <Image
                    src="/images/mic.svg"
                    width={16}
                    height={16}
                    alt="mic"
                  />
                </div>
              ) : (
                <div className="ml-auto pr-4 mr-2 w-[18px] h-[18px] bg-[#755AE2] rounded-full" />
              )}
              {item.hardware === "Mic" && videoAudioPermission ? (
                <div className="w-[39px] h-[39px] rounded-full bg-[transparent] border-2 border-[#755AE2] flex justify-center items-center">
                  <div className="w-[28px] h-[28px] rounded-full bg-[#755AE2] flex justify-center items-center">
                    <Image
                      src="/images/checkmark.svg"
                      width={18}
                      height={18}
                      alt="icon"
                    />
                  </div>
                </div>
              ) : item.hardware === "Webcam" && faceDetections.length ? (
                <div className="w-[39px] h-[39px] rounded-full bg-[transparent] border-2 border-[#755AE2] flex justify-center items-center">
                  <div className="w-[28px] h-[28px] rounded-full bg-[#755AE2] flex justify-center items-center">
                    <Image
                      src="/images/checkmark.svg"
                      width={18}
                      height={18}
                      alt="icon"
                    />
                  </div>
                </div>
              ) : (
                item.icon
              )}
              {item.hardware}
            </div>
          ))}
        </div>
      </section>
      <button
        onClick={() => {
          setVideoMode(false);
          setShowModal(true);
          clearInterval(idInterval || 0);
          cancelAnimationFrame(requestRef.current);
        }}
        className="bg-[#755AE2] rounded-md text-white p-3 mt-8"
      >
        Take picture and continue
      </button>
      <Modal
        showCloseButton
        show={showModal}
        setShow={setShowModal}
        body={
          <div className="flex justify-center mt-8">
            <p className="w-[40%] text-center">
              Kindly keep to the rules of the assessment and sit up, stay in
              front of your camera/webcam and start your assessment.
            </p>
          </div>
        }
        footer={
          <div className="flex justify-end mr-4 mb-4">
            <button className="bg-[#755AE2] text-white rounded-md px-6 p-2">
              Proceed
            </button>
          </div>
        }
        title={<p>Start assessement</p>}
      />
    </div>
  );
};
