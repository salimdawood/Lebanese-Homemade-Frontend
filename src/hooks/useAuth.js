import { useContext } from "react";
//context
import { userContext } from "../context/userContext";

const useAuth = () =>{
  return useContext(userContext)
}

export default useAuth