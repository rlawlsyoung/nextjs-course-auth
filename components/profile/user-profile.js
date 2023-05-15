import { getSession } from "next-auth/client";
import { useState } from "react";

import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useEffect } from "react";

function UserProfile() {
  const [isLoading, setIsLoading] = useState(true);
  // const [loadedSession, setLoadedSession] = useState();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = "/auth";
      } else {
        setIsLoading(false);
        // setLoadedSession(session);
      }
    });
  }, []);

  if (isLoading) {
    return <p className={classes.profile}>Loading..</p>;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
