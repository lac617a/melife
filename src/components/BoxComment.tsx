import React from "react";
import { format } from "@formkit/tempo";

import { classNames } from "@src/utils";
import { MessageContent } from "@src/types";

interface Props extends MessageContent {
  onReplyIdSelect: (reply: MessageContent) => void;
}

const BoxComment: React.FC<Props> = (props) => {
  const { message, created_at, reply_messages, onReplyIdSelect } = props;
  const baseClass =
    "bg-slate-50 flex w-full justify-between border border-gray-300 rounded-md";
  return (
    <>
      <div className={classNames(baseClass, "mt-5")}>
        <div className="p-3 w-full">
          <p className="text-gray-600 text-lg mt-2 pointer-events-none font-semibold">
            {message}
          </p>
          <div className="flex justify-between items-end">
            <button
              className="text-right text-blue-500"
              onClick={() => onReplyIdSelect(props)}
            >
              Realizar un comentario
            </button>
            <span className="text-xs font-normal text-gray-500">
              <time>{format(created_at, "MMM D/YY - h:mm a")}</time>
            </span>
          </div>
        </div>
      </div>
      {reply_messages?.length > 0 &&
        reply_messages.map((item, index) => (
          <React.Fragment key={index}>
            <div className="text-gray-300 font-bold pl-14">|</div>
            <div className={classNames(baseClass, "ml-5")}>
              <div className="p-3 w-full">
                <p className="text-gray-600 text-sm mt-2 pointer-events-none font-semibold">
                  {item.message}
                </p>
                <div className="flex justify-end items-end">
                  <span className="text-xs font-normal text-gray-500">
                    <time>
                      {format(item.created_at, "MMM D/YY - h:mm a", "es")}
                    </time>
                  </span>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
    </>
  );
};

export default React.memo(BoxComment);
