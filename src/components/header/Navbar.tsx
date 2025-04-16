import AppDesktopNavbar from "./AppDesktopNavbar";
import AppMobileNavbar from "./AppMobileNavbar";

export default function Navbar() {
  return (
    <header>
      <div className="hidden md:block">
        <AppDesktopNavbar />
      </div>
      <div className="block md:hidden">
        <AppMobileNavbar />
      </div>
    </header>
  );
}
