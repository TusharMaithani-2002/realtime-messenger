import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return "";
    }

    return params.conversationId;
  }, [params?.conversationId]);

  // !! turns string into boolean
  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  function returnOpenId(isOpen,conversationId) {
    return {
      isOpen,conversationId
    }
  }

  return useMemo(() => returnOpenId(isOpen,conversationId),[isOpen,conversationId]);

};


export default useConversation;
