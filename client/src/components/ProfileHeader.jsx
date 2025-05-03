import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { clearGlobalItem } from "../utils/utils";

const ProfileHeader = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearGlobalItem();
    navigate("/login");
  };

  return (
    <div>
      <Button danger type="primary" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default ProfileHeader;
