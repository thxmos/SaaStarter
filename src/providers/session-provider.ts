"use client";

import { Session, User } from "lucia";
import React from "react";
import { createContext, Provider, ReactNode, useContext } from "react";

export interface SessionProviderProps {
  user: User | null;
  session: Session | null;
}

const defaultSessionProviderProps = {
  user: null,
  session: null,
};

const SessionContext = createContext<SessionProviderProps>(
  defaultSessionProviderProps,
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
  return React.createElement(SessionContext.Provider, { value }, children);
};
