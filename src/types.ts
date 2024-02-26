export type MessageContent = {
  id: number;
  uuid: string;
  status: boolean;
  message: string;
  reply: boolean;
  reply_id: number;
  created_at: string;
  reply_messages: Omit<MessagesList, "reply_messages">;
};

export type MessagesList = MessageContent[];
