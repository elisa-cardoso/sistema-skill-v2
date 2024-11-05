import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/sign-in");
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Sair
    </Button>
  );
}