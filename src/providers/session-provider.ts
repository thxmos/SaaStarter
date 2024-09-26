"use client";

import { Session, User } from "lucia";
import { createContext, ReactNode, useContext } from "react";

export interface SessionProviderProps {
  user: User | null;
  session: Session | null;
}

const defaultSessionProviderProps = {
  user: null,
  session: null,
};

const SessionContext = createContext<SessionProviderProps>(
  defaultSessionProviderProps
);

export const useSession = () => {
  const sessionContext = useContext(SessionContext);

  if (!sessionContext) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return sessionContext;
};

export const SessionProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: SessionProviderProps;
}) => {
  return (
    <SessionContext.Provider value={value}>
    {children}
    </SessionContext.Provider>
  );
};
