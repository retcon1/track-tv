import React from "react";

interface SuccessProps {
  text: string;
}

const Success = ({ text }: SuccessProps) => {
  return (
    <div className="toast toast-end toast-top z-50">
      <div className="alert alert-success max-w-[300px] break-words whitespace-normal">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Success;
