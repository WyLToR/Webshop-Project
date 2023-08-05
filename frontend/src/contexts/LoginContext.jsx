import { useState, createContext } from 'react';

export const LoginContext = createContext(null);
export function LoginProvider({ children }) {
  const [showLogger, setShowLogger] = useState(false);
  return (
    <LoginContext.Provider value={{ showLogger, setShowLogger }}>
      {children}
    </LoginContext.Provider>
  );
}
