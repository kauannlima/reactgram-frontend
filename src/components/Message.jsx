import React from "react";

const Message = ({ msg, type }) => {
  const textColor = type === "success" ? "#833AB4" : "#FD1D1D";

  return (
    <div className="rounded-md py-1 px-2 m-0 flex items-center justify-center min-h-[32px]">
      <p style={{ color: textColor }} className="text-sm text-center">
        {msg}
      </p>
    </div>
  );
};

export default Message;
