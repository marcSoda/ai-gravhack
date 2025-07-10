import React, { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Home, Calculator, List, PlusSquare, Edit2, LogOut, Moon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from 'sonner'

interface NavLinkItem {
  type: 'link';
  to: string;
  Icon: LucideIcon;
  title: string;
}

interface NavActionItem {
  type: 'action';
  action: () => void;
  Icon: LucideIcon;
  title: string;
}

type NavItemProps = NavLinkItem | NavActionItem;

// reusable NavItem compoenent to avoid code duplication
// a nav item can either be a link (Link) or an action (button)
const NavItem: React.FC<NavItemProps & { isOpen: boolean }> = (props) => {
    const { Icon, title, isOpen } = props;
    const commonProps = {
        className: "flex items-center justify-start h-14 px-4 rounded-md my-1 group cursor-pointer",
        style: { boxSizing: 'border-box' } as React.CSSProperties,
        onMouseOver: (e: MouseEvent) => (e.currentTarget as HTMLElement).style.backgroundColor = '#4B5563',
        onMouseOut: (e: MouseEvent) => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent',
    };

    if (props.type === 'link') {
        return (
            <Link to={props.to} {...commonProps}>
                <Icon className="flex-none w-8 h-8 text-white" />
                <span className={`ml-4 text-base font-medium transition-opacity duration-500 ease-in-out ${!isOpen && 'opacity-0 pointer-events-none'}`}>
                    {title}
                </span>
            </Link>
        );
    } else { // 'action'
        return (
            <button onClick={props.action} {...commonProps}>
                <Icon className="flex-none w-8 h-8 text-white" />
                <span className={`ml-4 text-base font-medium transition-opacity duration-500 ease-in-out ${!isOpen && 'opacity-0 pointer-events-none'}`}>
                    {title}
                </span>
            </button>
        );
    }
};

const Sidenav: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Main navigation items
    const navItems: NavItemProps[] = [
        { type: 'link', to: '/', Icon: Home, title: 'Home' },
        { type: 'action', action: () => toast.error("Not yet implemented"), Icon: Calculator, title: 'Calcs' },
        { type: 'action', action: () => toast.error("Not yet implemented"), Icon: List, title: 'Master Lists' },
        { type: 'action', action: () => toast.error("Not yet implemented"), Icon: PlusSquare, title: 'Create List' },
        { type: 'action', action: () => toast.error("Not yet implemented"), Icon: Edit2, title: 'Edit List' },
    ];

    // Bottom navigation items
    const bottomNavItems: NavItemProps[] = [
        { type: 'link', to: '/logout', Icon: LogOut, title: 'Logout' },
        { type: 'action', action: () => console.log('Toggle Dark Mode'), Icon: Moon, title: 'Theme' },
    ];

    return (
        <div
            className={`fixed top-0 left-0 h-full z-30 shadow-lg transition-width duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-secondary`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div className="flex flex-col justify-between h-full">
                <nav className="flex flex-col justify-center flex-1">
                    {navItems.map((item, index) => (
                        <NavItem key={index} {...item} isOpen={isOpen} />
                    ))}
                </nav>
                <div className="pb-4">
                    {bottomNavItems.map((item, index) => (
                        <NavItem key={`bottom-${index}`} {...item} isOpen={isOpen} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidenav;
