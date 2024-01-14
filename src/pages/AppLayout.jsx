import { Theme } from "@radix-ui/themes";
import React from "react";
import { Navbar } from "../components";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="--font-inter">
      <Theme accentColor="violet">
        <Navbar />
        <Outlet />
      </Theme>
    </div>
  );
};

export default AppLayout;
