import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../store/atoms";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {  // ✅ Fixed component name
  const token = useRecoilValue(tokenAtom);

  return token ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
