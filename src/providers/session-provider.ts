"use client";
import { Session } from "lucia";
import React from "react";
import { createContext, ReactNode, useContext } from "react";

export interface SessionProviderProps {
  user: any;
  session: Session | null;
}

const defaultSessionProviderProps = {
  user: null,
  session: null,
};

export const SessionContext = createContext<SessionProviderProps>(
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
