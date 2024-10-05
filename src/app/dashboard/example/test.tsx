"use client";

import { Session, User } from "lucia";

interface Props {
  user: User;
  session: Session;
}

const Test: React.FC<Props> = ({ user, session }) => {
  return (
    <div className="flex flex-col gap-8">
      <p>{JSON.stringify(user)}</p>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default Test;
