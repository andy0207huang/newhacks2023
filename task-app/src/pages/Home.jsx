import React from "react";
import Calenderjfg from "../components/Calendar";
import AuthButton from "../components/AuthButton";

const Home = () => {
  return (
    <div>
      <h1>Welcome to TaskBreaker!</h1>
      <p>
        Break down your projects and assignments into smaller tasks and
        deadlines for enhanced productivity.
      </p>

      {/* g calendar integration */}
      <Calenderjfg />
      <AuthButton />

      {/* upload */}
    </div>
  );
};

export default Home;
