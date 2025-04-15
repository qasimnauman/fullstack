
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-lostfound-tertiary rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="h-12 w-12 text-lostfound-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-lostfound-primary">404</h1>
        <p className="text-xl text-gray-800 mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or may have been removed.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-lostfound-primary hover:bg-lostfound-accent">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/browse">Browse Lost & Found Items</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
