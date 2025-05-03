import React from "react";
import { getGlobalItem } from "../utils/utils";

const Dashboard = () => {
  const user = getGlobalItem("user");

  return (
    <div>
      <h1 className="text-xl mb-5">Welcome, {user?.name}!</h1>
    </div>
  );
};

export default Dashboard;
