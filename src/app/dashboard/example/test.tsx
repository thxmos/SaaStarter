"use client";

import { Session, User } from "lucia";

interface Props {
  user: User;
  session: Session;
}

const Test: React.FC<Props> = ({ user, session }) => {
  console.log("user", user);
  return (
    <main className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col gap-8">
          <p>{JSON.stringify(user)}</p>
          <p>{JSON.stringify(session)}</p>
        </div>
      </div>
    </main>
  );
};

export default Test;
