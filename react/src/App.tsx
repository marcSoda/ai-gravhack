import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AboutPage from "./AboutPage";
import TeamPage from "./TeamPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import TopNav from "./components/common/topnav";
import Sidenav from "./components/common/Sidenav";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import LoginForm from "./features/auth/Login";
import Logout from "./features/auth/Logout";
import MainPage from "./features/main/MainPage";
import useHideSidenavOnRoutes from "./hooks/useHideSidenavOnRoutes";

function App() {
  const showNav = useHideSidenavOnRoutes(["/login"]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Toaster richColors />
        <div className={`flex flex-col ${showNav ? "pt-16" : "pt-0"} h-screen`}>
          {showNav && <TopNav />}
          <div className="flex flex-1 overflow-hidden">
            {showNav && <Sidenav />}
            <div
              className={`flex-1 overflow-auto ${showNav ? "pl-16" : ""}`}
            >
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route
                  path="*"
                  element={
                    <ProtectedRoute>
                      <MainPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
