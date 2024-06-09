import { PropsWithChildren, createContext, useState } from "react";
export const LoginContext = createContext<{
  usernameRequested?: string;
  setUsernameRequested: (u?: string) => void;
}>({ usernameRequested: undefined, setUsernameRequested: () => undefined });

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const [usernameRequested, setUsernameRequested] = useState<string>();

  return (
    <LoginContext.Provider value={{ usernameRequested, setUsernameRequested }}>
      {children}
    </LoginContext.Provider>
  );
};
