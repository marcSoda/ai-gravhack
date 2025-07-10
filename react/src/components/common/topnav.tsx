import type { LucideIcon } from "lucide-react";
import { Home, Info, LogOut, UsersRound } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

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

const NavItem: React.FC<NavItemProps> = (props) => {
  const { Icon, title } = props;
  const commonProps = {
    className:
      "flex items-center justify-start h-14 px-4 rounded-md my-1 group cursor-pointer",
    style: { boxSizing: "border-box" } as React.CSSProperties,
    onMouseOver: (e: React.MouseEvent) =>
      ((e.currentTarget as HTMLElement).style.backgroundColor = "#4B5563"),
    onMouseOut: (e: React.MouseEvent) =>
      ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent"),
  };

  if (props.type === "link") {
    return (
      <Link to={props.to} {...commonProps}>
        <Icon className="flex-none w-8 h-8 text-white" />
        <span className="ml-4 text-base font-medium">{title}</span>
      </Link>
    );
  } else {
    return (
      <button onClick={props.action} {...commonProps}>
        <Icon className="flex-none w-8 h-8 text-white" />
        <span className="ml-4 text-base font-medium">{title}</span>
      </button>
    );
  }
};

const TopNav: React.FC = () => {
  const location = useLocation();

  // Don't show on login page
  if (location.pathname === "/login") {
    return null;
  }

  const navItems: NavItemProps[] = [
    { type: "link", to: "/", Icon: Home, title: "Home" },
    { type: "link", to: "/about", Icon: Info, title: "About" },
    { type: "link", to: "/team", Icon: UsersRound, title: "Team" },
  ];

  const rightNavItems: NavItemProps[] = [
    { type: "link", to: "/logout", Icon: LogOut, title: "Logout" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-50 bg-gray-900">
      <div className="h-full w-full flex items-center">
        <div className="pl-6" style={{ display: "flex" }}>
          {navItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>
        <div className="flex-1" />
        <nav className="flex h-full items-center space-x-2 pr-4">
          {rightNavItems.map((item, index) => (
            <NavItem key={`right-${index}`} {...item} />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default TopNav;
