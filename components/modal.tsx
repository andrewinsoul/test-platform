import React, { Dispatch, SetStateAction } from "react";
import ReactModal from "react-modal";
import Text from "./text";

export const Modal = ({
  show,
  setShow,
  title,
  body,
  footer,
}: {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  title: React.ReactNode;
  body: React.ReactNode | string;
  footer: React.ReactNode;
}) => {
  return (
    <ReactModal isOpen={show}>
      <div className="bg-[#F5F3FF] rounded-md w-[45%]">
        <section className="text-white bg-[#755AE2]">
          <Text className="font-bold text-white">{title}</Text>
          <button onClick={() => setShow(false)} className="bg-[#F5F3FF]">
            <span>Close</span>
          </button>
        </section>
				<section>
					{body}
				</section>
				<section>
					{footer}
				</section>
      </div>
    </ReactModal>
  );
};
