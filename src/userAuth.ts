import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const userAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return;
};
