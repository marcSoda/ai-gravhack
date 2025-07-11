import { HelpCircle, Home, Info, LogOut, UsersRound, type LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import paul from "../../assets/paul.png";

interface NavLinkItem {
  type: "link";
  to: string;
  Icon: LucideIcon;
  title: string;
}

interface NavActionItem {
  type: "action";
  action: () => void;
  Icon: LucideIcon;
  title: string;
}

type NavItemProps = NavLinkItem | NavActionItem;

const NavItem: React.FC<NavItemProps & { isOpen: boolean }> = ({
  type,
  to,
  action,
  Icon,
  title,
  isOpen,
}) => {
  const base =
    "flex items-center justify-start h-14 px-4 rounded-md my-1 transition-colors cursor-pointer hover:bg-accent";
  const content = (
    <>
      <Icon className="flex-none w-8 h-8" />
      <span
        className={`ml-4 text-base font-medium transition-opacity duration-500 ease-in-out ${
          !isOpen && "opacity-0 pointer-events-none"
        }`}
      >
        {title}
      </span>
    </>
  );

  return type === "link" ? (
    <Link to={to!} className={base}>
      {content}
    </Link>
  ) : (
    <button onClick={action} className={base}>
      {content}
    </button>
  );
};

const Sidenav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItemProps[] = [
    { type: "link", to: "/", Icon: Home, title: "Home" },
    { type: "link", to: "/team", Icon: UsersRound, title: "Team" },
    { type: "link", to: "/about", Icon: Info, title: "About" },
    { type: "link", to: "/help", Icon: HelpCircle, title: "Help" },
  ];

  const bottomNavItems: NavItemProps[] = [
    { type: "link", to: "/logout", Icon: LogOut, title: "Logout" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full z-30 shadow-lg transition-[width] duration-300 ${
        isOpen ? "w-64" : "w-16"
      } bg-secondary text-secondary-foreground`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-col justify-between h-full">
        <img
          src={paul}
          title="The Wizard of Shad"
          style={{
            maxWidth: "100%",
            height: "auto",
            marginTop: 80,
            opacity: isOpen ? 1 : 0,
          }}
        />
        <nav className="flex flex-col justify-center flex-1">
          {navItems.map((item) => (
            <NavItem key={item.title} {...item} isOpen={isOpen} />
          ))}
        </nav>
        <div className="pb-4">
          {bottomNavItems.map((item) => (
            <NavItem key={item.title} {...item} isOpen={isOpen} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
