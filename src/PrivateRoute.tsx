import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PrivateRoute = ({
  children,
}: {
  children: React.ReactElement;
}): null | React.ReactElement => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("login_token")) {
      navigate("/", {
        replace: true,
      });
    }
  }, []);

  return children;
};

export default PrivateRoute;
