import {useMemo} from 'react';
import { usePathname } from 'next/navigation';
import {HiChat} from 'react-icons/hi';
import { HiArrowLeftOnRectangle,HiUsers } from 'react-icons/hi2';
import { signOut} from 'next-auth/react';
import useConversation from './useConversation';


const useRoutes = () => {
    const pathname = usePathname();
    const {conversationId} = useConversation();
  

    function returnRoutes(pathname,conversationId) {
       return [
        {
            label:'Chat',
            href:'/conversations',
            icon:HiChat,
            active: pathname === '/coversations' || !!conversationId
        },
        {
            label:'Users',
            href:'/users',
            icon:HiUsers,
            active: pathname === '/users'
        },
        {
            label:'Logout',
            href:'#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle
        }
    ] 
    }

    const routes = useMemo(() => returnRoutes(pathname,conversationId),[pathname,conversationId]);
    return routes;
}

export default useRoutes;
