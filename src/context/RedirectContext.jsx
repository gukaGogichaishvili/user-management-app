import React, { createContext, useContext, useState } from "react";

const RedirectContext = createContext();

export const RedirectProvider = ({ children }) => {
  const [redirecting, setRedirecting] = useState(true);

  return (
    <RedirectContext.Provider value={{ redirecting, setRedirecting }}>
      {children}
    </RedirectContext.Provider>
  );
};

export const useRedirectContext = () => {
  return useContext(RedirectContext);
};
