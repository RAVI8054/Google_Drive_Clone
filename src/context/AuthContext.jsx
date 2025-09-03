import { createContext } from "react";

// creating the auth context.. ---  Default value is null and any components consuming this context will get the value from AuthProvider. and  this will be imported by AuthProvider or components that want to consume the context
const AuthContext=createContext(null);

export default AuthContext;