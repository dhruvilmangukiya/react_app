import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import ProfileHeader from "../components/ProfileHeader";
import { getGlobalItem } from "../utils/utils";

const { Header, Sider, Content, Footer } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menu, setMenu] = useState([]);
  const data = useLocation().pathname.split("/")[1];
  const user = getGlobalItem("user");

  const details = {
    dashboard: "1",
    users: "2",
    profile: "3",
  };

  useEffect(() => {
    const user = getGlobalItem("user");
    if (user?.role) {
      const menuItem = [
        {
          key: "1",
          icon: <HomeOutlined />,
          label: <Link to="/dashboard">Dashboard</Link>,
        },
      ];

      setMenu(menuItem);
    }
  }, []);

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-white capitalize">
            {!collapsed ? user?.role : ""}
          </h1>
        </div>

        <Menu
          className="mt-5"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[details[data]]}
          items={menu}
        />
      </Sider>

      {/* Layout Content */}
      <Layout>
        <Header className="p-0 bg-white flex items-center">
          <div className="w-full flex items-center justify-between pe-4">
            <Button
              type="text"
              className="text-base ml-4"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <ProfileHeader />
          </div>
        </Header>

        {/* Dynamic Content */}
        <Content className="my-6 mx-4 p-6 bg-white rounded-lg">
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer className="text-center">
          ©2024 Created by Dhruvil Mangukiya
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
