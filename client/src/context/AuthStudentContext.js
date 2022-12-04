import { createContext, useReducer } from "react";

export const AuthStudentContext = createContext();
export const studentAuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { student: action.payload };
    case "LOGOUT":
      return { student: null };
    default:
      return state;
  }
};
export const AuthStudentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentAuthReducer, { student: null });

  console.log("AuthContext state", state);
  return (
    <AuthStudentContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthStudentContext.Provider>
  );
};
