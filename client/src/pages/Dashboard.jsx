import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getGlobalItem } from "../utils/utils";
import { createUser } from "../services/user.services";

const Dashboard = () => {
  const user = getGlobalItem("user");
  const [profileImage, setProfileImage] = useState("");

  const onFileSelected = async (event) => {
    try {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("name", "test user");
        formData.append("email", "testusers789@gmail.com");
        formData.append("password", "test");
        formData.append("role", "student");
        formData.append("image", file);

        const result = await createUser(formData);
        setProfileImage(
          process.env.REACT_APP_IMAGE_URL + result?.fullData?.image
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-xl mb-5">Welcome, {user?.name}!</h1>
      <div>
        <input
          type="file"
          id="fileInput"
          onChange={(event) => onFileSelected(event)}
        />
        <img
          src={profileImage}
          alt="Admin"
          className="rounded-circle"
          width="200"
          height="200"
        />
      </div>
      <nav className="flex space-x-4 font-medium">
        <Link to="/category" className="text-blue-600 hover:underline">
          Category
        </Link>
        <Link to="/product" className="text-blue-600 hover:underline">
          Product
        </Link>
      </nav>
    </div>
  );
};

export default Dashboard;
