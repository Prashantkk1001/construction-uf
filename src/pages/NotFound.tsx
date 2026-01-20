import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  // Memoized redirect function
  const handleRedirect = useCallback(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  useEffect(() => {
    // Clean pathname once
    const cleanPath = location.pathname.split('http')[0].replace(/\/$/, '');
    console.error("404 →", cleanPath);
    
    // Countdown interval
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [handleRedirect]);  // ✅ Stable deps only

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-12 shadow-2xl text-center">
        {/* Icon */}
        <div className="w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🚫</span>
        </div>
        
        {/* Title */}
        <h1 className="text-6xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        
        {/* Message + Countdown */}
        <p className="text-xl text-gray-700 mb-2">Page not found</p>
        <p className="text-sm text-gray-500 mb-8">
          Redirecting to home in <span className="font-bold text-red-600">{countdown}</span>s...
        </p>
        
        {/* Button */}
        <button
          onClick={handleRedirect}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
        >
          Go Home Now
        </button>
      </div>
    </div>
  );
};

export default NotFound;
