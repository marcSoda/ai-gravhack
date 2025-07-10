import { useLocation } from 'react-router-dom';

const useHideSidenavOnRoutes = (routesToHide: string[]): boolean => {
    const location = useLocation();
    return !routesToHide.includes(location.pathname);
};
export default useHideSidenavOnRoutes;
