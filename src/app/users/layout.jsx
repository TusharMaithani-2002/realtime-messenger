
import SideBar from '../components/sidebar/SideBar'
export default async function UsersLayout ({children}) {
    return (
        <SideBar>
        <div className="h-full">{children}</div>
        </SideBar>
    )
}