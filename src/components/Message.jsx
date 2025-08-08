import React from "react";

const Message = ({ msg, type }) => {
  return  <div className="rounded-md py-1 px-2 m-0 flex items-center justify-center   min-h-[32px]">
  <p className="text-[#FD1D1D] text-sm text-center">{msg}</p>
</div>


};

export default Message;
