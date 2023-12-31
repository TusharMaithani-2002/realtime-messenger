"use client";

import Avatar from "@/app/components/Avatar";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";
import useOtherUser from "@/app/hooks/useOtherUser";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "./ProfileDrawer";

const Header = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {members} = useActiveList();

  const isActive = members.indexOf(otherUser?.email) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? `Active`:`Offline`;
  }, [conversation,isActive]);
  return (
    <>
    <ProfileDrawer 
    data={conversation}
    isOpen={drawerOpen}
    onClose={()=>setDrawerOpen(false)}
    />
      <div
        className="bg-white w-full flex border-b-[1px]
    sm:px-4 py-3 px-4 lg:-x-6 justify-between items-center shadow-sm
    "
      >
        <div className="flex gap-3 items-center">
          <Link
            href={"/conversations"}
            className="
            lg:hidden
            block
            text-purple-600
            hover:text-purple-700
            transition
            cursor-pointer
            "
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (<AvatarGroup users={conversation.users}/>) : (<Avatar user={otherUser} />)}
          
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div
              className="text-sm font-light
                text-neutral-500"
            >
              {statusText}
            </div>
          </div>
          <HiEllipsisHorizontal
            size={32}
            onClick={() => setDrawerOpen(true)}
            className="
            text-purple-600
            cursor-pointer
            hover:text-purple-600
            transition
            "
          />
        </div>
      </div>
    </>
  );
};

export default Header;
