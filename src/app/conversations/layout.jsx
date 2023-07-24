import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import SideBar from "../components/sidebar/SideBar";
import ConversationList from "./components/ConversationList";

export default async function ConverstaionsLayout({children}) {

    const conversations = await getConversations();
    const users = await getUsers();
    return (
        <SideBar>
            <div className="h-full">
                <ConversationList 
                initialItems = {conversations}
                users={users}
                />
                {children}
            </div>
        </SideBar>
    )
}