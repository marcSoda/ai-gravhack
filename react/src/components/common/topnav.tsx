import { Bot, Moon, Sun } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const TopNav: React.FC = () => {
  const location = useLocation();
  if (location.pathname === "/login") return null;

  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const ThemeIcon = theme === "dark" ? Sun : Moon;

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-50 bg-secondary text-secondary-foreground">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center">
          <Bot className="w-8 h-8" />
          <span className="ml-3 text-xl font-semibold select-none">
            ShadowbaseAI
          </span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-accent transition-colors"
        >
          <ThemeIcon className="w-7 h-7" />
        </button>
      </div>
    </header>
  );
};

export default TopNav;
