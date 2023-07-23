"use client";

import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import {useState,useRef, useEffect} from 'react';
import MessageBox from './MessageBox';

const Body = ({initialMessages}) => {
    const [messages,setMessages] = useState(initialMessages);
    const bottomRef = useRef(null);

    const {conversationId} = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    },[conversationId]);
     
    return (
        // flex-1 makes body take entire space left after form component
        <div className="flex-1 overflow-y-auto">
            {messages.map((message,i) => (
                <MessageBox 
                key={message.id}
                isLast={i == messages.length-1}
                data={message}
                />
            ))}
            <div  ref={bottomRef} className='pt-24'/>
        </div>
    )
};

export default Body;