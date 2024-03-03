"use client";
import React from "react";
import socket from "@src/service/socket";
import { MessageContent, MessagesList } from "@src/types";

import { classNames } from "@src/utils";
import BoxComment from "@src/components/BoxComment";
import PreviewComment from "@src/components/PreviewComment";
import TypingAnimated from "@src/components/TypingAnimated";

export default function Home() {
  const dummy = React.useRef<HTMLDivElement | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const [replyId, setReplyId] = React.useState<MessageContent>();
  const [messages, setMessages] = React.useState<MessagesList>([]);
  const [messageContent, setMessageContent] = React.useState<string>("");
  const [countUsersConnect, setCountUsersConnect] = React.useState<number>(0);

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
    const getToken = sessionStorage.getItem("connection_n");
    if (getToken) {
      socket.emit("connects", getToken, () => {});
    } else {
      const uniqueId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
      sessionStorage.setItem("connection_n", uniqueId);
      socket.emit("connects", uniqueId, () => {});
    }
    socket.on("connected", (count) => setCountUsersConnect(count));

    scrollToEnd();
    return () => {
      socket.off("connects");
      socket.off("connected");
    };
  }, []);

  React.useEffect(() => {
    socket.emit("get-all-chat-list", () => {});
    socket.on("all-chats-message", (data: MessagesList) => setMessages(data));

    scrollToEnd();
    return () => {
      socket.off("all-chats-message");
      socket.off("get-all-chat-list");
    };
  }, []);

  React.useEffect(() => {
    socket.on("new-message", (data: MessageContent) => {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(data.message);
        }
      });
      setMessages((current) => [...current, data]);
      scrollToEnd();
    });
    return () => {
      socket.off("new-message");
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col m-auto p-5">
      <h1 className="font-bold lg:text-3xl text-center">
        <TypingAnimated />
      </h1>
      <div className="absolute lg:right-10 lg:top-20 top-36 right-[-69px] max-lg:rotate-90">
        <div className="flex items-center justify-end font-semibold text-gray-600 bg-slate-50 self-end p-2 px-4 rounded-md lg:text-base text-xs">
          <span className="pulse" />
          Usuari/s conectad/s ({countUsersConnect})
        </div>
      </div>
      <div className="flex max-w-[550px] flex-col gap-3 m-auto p-5">
        <div className="overflow-y-auto h-[calc(100vh_-_250px)]">
          <div className="flex-1 w-full overflow-x-hidden lg:px-5">
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

        <div className="relative z-20 flex gap-x-3 w-full px-5">
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
      </div>
      <div
        className={classNames(
          "absolute lg:bottom-[8%] lg:left-[10%] bottom-[20%] left-[33%]",
          replyId ? "animate-fade-up animate-once" : "opacity-0"
        )}
      >
        <PreviewComment
          {...(replyId as MessageContent)}
          onClose={() => setReplyId(undefined)}
        />
      </div>
      <span className="text-gray-900 text-center max-sm:text-xs rounded-md max-sm:bg-white max-sm:p-2">
        Todos los mensajes enviados son 100% anónimos
      </span>
    </main>
  );
}
