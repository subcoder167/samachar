import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/Nav/Nav";
const Main = ({ role }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("first_name") == "" ||
      localStorage.getItem("last_name") == ""
    )
      navigate("/dashboard/profile");
    else navigate("/dashboard/upload");
  }, []);
  return (
    <>
      <Nav role={role} />
      <section className="mainWrapper">
        <Outlet />
      </section>
    </>
  );
};

export default Main;
