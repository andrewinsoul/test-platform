import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import ReactModal from "react-modal";
import Text from "./text";

export const Modal = ({
  show,
  setShow,
  title,
  body,
  footer,
  showCloseButton,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  title: React.ReactNode;
  body: React.ReactNode | string;
  footer: React.ReactNode;
  showCloseButton?: boolean;
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ReactModal
      isOpen={show}
      overlayClassName="Overlay"
      style={{
        content: {
          top: "50%",
          left: "50%",
          padding: 0,
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: width < 900 ? "90%" : "60%",
        },
      }}
    >
      <div className="bg-[#F5F3FF] border rounded-md">
        <section className="text-white rounded-bl-md rounded-br-md p-2 bg-[#755AE2] flex justify-between">
          <Text className="font-bold text-white">{title}</Text>
          {showCloseButton && (
            <button
              onClick={() => setShow(false)}
              className="border border-[#f5f3ff33] rounded-md p-1 px-3 bg-[#f5f3ff33]"
            >
              <span>Close</span>
            </button>
          )}
        </section>
        <section>{body}</section>
        <section>{footer}</section>
      </div>
    </ReactModal>
  );
};
