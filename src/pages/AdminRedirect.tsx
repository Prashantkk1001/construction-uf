import { useEffect } from "react";

const AdminRedirect = () => {
  useEffect(() => {
    window.location.replace("http://localhost:5173");
  }, []);

  return null; // काहीच render नको
};

export default AdminRedirect;
