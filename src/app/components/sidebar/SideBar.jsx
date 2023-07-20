import DesktopSideBar from "./DesktopSideBar";
import MobileFooter from "./MobileFooter";

async function SideBar({ children }) {
  return (
    <div className="h-full">
        <DesktopSideBar />
        <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default SideBar;
