"use client";
import React from "react";
import socket from "@src/service/socket";
import { MessageContent, MessagesList } from "@src/types";

import BoxComment from "@src/components/BoxComment";
import PreviewComment from "@src/components/PreviewComment";
import { classNames } from "@src/utils";

export default function Home() {
  const dummy = React.useRef<HTMLDivElement | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const [replyId, setReplyId] = React.useState<MessageContent>();
  const [messages, setMessages] = React.useState<MessagesList>([]);
  const [messageContent, setMessageContent] = React.useState<string>("");

  const handleSubmit = async () => {
    if (messageContent === "") return;
    socket.emit("send-message", {
      chat_id: replyId?.id,
      message: messageContent,
    });
    setReplyId(undefined);
    setMessageContent("");
  };

  const scrollToEnd = () =>
    setTimeout(
      () =>
        dummy.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "end",
        }),
      500
    );

  const handleReplyIdSelect = (reply: MessageContent) => {
    setReplyId(reply);
    textareaRef.current?.focus();
  };

  React.useEffect(() => {
    socket.emit("get-all-chat-list", "", () => {});
    socket.on("all-chats-message", (data: MessagesList) =>
      setMessages([...data].reverse())
    );

    scrollToEnd();
    return () => {
      socket.off("get-all-chat-list");
      socket.off("all-chats-message");
    };
  }, []);

  React.useEffect(() => {
    socket.on("new-message", (data: MessageContent) => {
      setMessages((current) => [...current, data]);
    });
    return () => {
      socket.off("new-message");
    };
  }, []);

  return (
    <main className="flex min-h-screen max-w-[550px] flex-col gap-6 m-auto p-5">
      <h1 className="font-bold text-3xl text-center">¿Cómo te sientes hoy?</h1>
      <div className="overflow-y-auto h-[calc(100vh_-_270px)]">
        <div className="flex-1 w-full overflow-x-hidden px-5">
          {messages.map((item) => (
            <BoxComment
              key={item.uuid}
              {...item}
              onReplyIdSelect={handleReplyIdSelect}
            />
          ))}
        </div>
        <span ref={dummy} />
      </div>

      <div className="flex gap-x-3 w-full px-5">
        <div className="relative bg-slate-50 flex-auto">
          <div className="overflow-hidden rounded-md pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="comment" className="sr-only">
              ¿Cómo te sientes hoy?
            </label>
            <textarea
              ref={textareaRef}
              rows={2}
              id="comment"
              name="comment"
              value={messageContent}
              placeholder="¿Cómo te sientes hoy?"
              onChange={(e) => setMessageContent(e.target.value)}
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-end py-2 pl-3 pr-2">
            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Exprésate
            </button>
          </div>
        </div>
      </div>
      <div
        className={classNames(
          "absolute bottom-[7%] left-[20%]",
          replyId ? "animate-fade-up animate-once" : "opacity-0"
        )}
      >
        <PreviewComment
          {...(replyId as MessageContent)}
          onClose={() => setReplyId(undefined)}
        />
      </div>
      <span className="text-gray-900 text-center">
        Todos los mensajes enviados son 100% anónimos
      </span>
    </main>
  );
}
