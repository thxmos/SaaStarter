"use client";

import { User } from "@/types/user";
import { Session } from "lucia";
import React, { createElement, useContext, useEffect, useState } from "react";
import { createContext, ReactNode } from "react";

interface SessionContextType {
  session: Session | null;
  user: User | null;
  setUser: (user: User) => void;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  user: null,
  setUser: () => {},
});

export const SessionProvider = ({
  children,
  sessionUser,
  session,
}: {
  children: ReactNode;
  sessionUser: any;
  session: Session | null;
}) => {
  const [user, setUser] = useState<any>(sessionUser);

  return React.createElement(
    SessionContext.Provider,
    {
      value: { user, session, setUser },
    },
    children,
  );
};

export const useSession = () => {
  const sessionContext = useContext(SessionContext);

  if (!sessionContext) {
    throw new Error("useSession must be used within 1 SessionProvider");
  }

  return sessionContext;
};
