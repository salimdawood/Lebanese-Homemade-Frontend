import { useContext } from "react";
import { userContext } from "../context/userContext";

const userAuth = () =>{
  return useContext(userContext)
}

export default userAuth