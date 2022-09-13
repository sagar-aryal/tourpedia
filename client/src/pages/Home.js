import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <div>
      {user && (
        <h1 style={{ textAlign: "center", marginTop: "24px" }}>
          Logged In as {user.existingUser.name}
        </h1>
      )}
    </div>
  );
};

export default Home;
