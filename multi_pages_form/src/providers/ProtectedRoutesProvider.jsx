import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/user";

const ProtectedRoutesProvider = () => {
  const { user, isLoading } = useAuth(); // Get user and loading state
  const location = useLocation();

  // Show a loading spinner if still checking user status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 mb-4"></div>
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login page if the user is null (logged out)
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render children components if the user is authenticated
  return <Outlet />;
};
// /Users/sakibkhan/Desktop/vs/web/temp/4/multi_pages_form/src/components/Home
export default ProtectedRoutesProvider;