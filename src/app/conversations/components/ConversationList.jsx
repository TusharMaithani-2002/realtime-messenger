"use client";

import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import clsx from "clsx";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";

const ConversationList = ({ initialItems,users }) => {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();

  const session = useSession();
  const [isModalOpen, setModalOpen] = useState(false);

  const { conversationId ,isOpen} = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  },[session.data?.user?.email]);


  useEffect(() => {
    if(!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation) => {
      setItems((current) => {
        if(find(current,{id:conversation.id})) {
          return current;
        }

        return [conversation,...current];
      });
    };

    const updateHandler = (conversation) => {
      setItems((current) => current.map((currentConversation) => {
        if(currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages :conversation.messages
          }
        }

        return currentConversation;
      }));
    };

    const removeHandler = (conversation) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      });

      if(conversationId === conversation.id) router.push('/conversations')
    }

    pusherClient.bind('conversation:new',newHandler);
    pusherClient.bind('conversation:update',updateHandler);
    pusherClient.bind('conversation:remove',removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new',newHandler);
      pusherClient.unbind('conversation:update',updateHandler);
      pusherClient.unbind('conversation:remove',removeHandler);
    }
  },[pusherKey,conversationId,router]);

  return (
    <>

    <GroupChatModal
    isOpen={isModalOpen}
    onClose={()=>setModalOpen(false)}
    users={users}
    />
      <aside
        className={clsx(
          `
        fixed
        inset-y-0
        pb-20
        lg:pb-20
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
    `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              className="
                 rounded-full
                 p-2
                 bg-gray-100
                 cursor-pointer
                 hover:opacity-75
                 transition
                "
              onClick={() => setModalOpen(true)}
            >
              <MdOutlineGroupAdd />
            </div>
          </div>

          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
