import { PropsWithChildren, createContext, useState } from "react";
export const LoginContext = createContext<{
  usernameRequested?: string;
  hasPasscode: boolean;
  setUsernameRequested: (u?: string) => void;
  setHasPasscode: (b: boolean) => void;
}>({
  usernameRequested: "",
  setUsernameRequested: () => undefined,
  hasPasscode: false,
  setHasPasscode: () => undefined,
});

export const LoginProvider = ({ children }: PropsWithChildren) => {
  const [usernameRequested, setUsernameRequested] = useState<string>();
  const [hasPasscode, setHasPasscode] = useState<boolean>(false);
  return (
    <LoginContext.Provider
      value={{
        usernameRequested,
        setUsernameRequested: (username?: string) => {
          setHasPasscode(!!username);
          setUsernameRequested(username);
        },
        hasPasscode,
        setHasPasscode,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
