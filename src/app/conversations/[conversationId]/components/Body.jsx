"use client";

import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import axios from "axios";
import { find } from "lodash";
import { useState, useRef, useEffect } from "react";
import MessageBox from "./MessageBox";

const Body = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        // protecting duplicate messages
        // making sure if message of lastest message id exist return
        if (find(current, { id: message.id })) {
          return current;
        }

        return [ ...current, message ];
      });
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage) => {
      setMessages((current)=>current.map((currentMessage) => {
        if(currentMessage.id === newMessage.id) {
          return newMessage;
        }

        return currentMessage;
      }))
    }

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update",updateMessageHandler);
    };
  }, [conversationId]);
  
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    // flex-1 makes body take entire space left after form component
    <div className="flex-1 overflow-y-auto">
      {messages && messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i == messages.length - 1}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
