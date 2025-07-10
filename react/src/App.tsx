import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import TopNav from "./components/common/topnav";
import LoginForm from "./features/auth/Login";
import Logout from "./features/auth/Logout";
import MainPage from "./features/main/MainPage";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "sonner";
import AboutPage from "./AboutPage";
import useHideSidenavOnRoutes from "./hooks/useHideSidenavOnRoutes";

function App() {
  const showSidenav = useHideSidenavOnRoutes(["/login"]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Toaster richColors />
        <div className={`flex ${showSidenav ? "pt-16" : "pt-0"}`}>
          {showSidenav && <TopNav />}
          <div className="flex-1">
            <div className="p-0">
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/about" element={<AboutPage />} />
                <Route
                  path="/"
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
