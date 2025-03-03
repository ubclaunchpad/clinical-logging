import React from "react";
import { NavLink } from "react-router-dom";
import ProfileBar from "./ProfileBar";
import { HomeIcon, BookOpenIcon, ClockIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/flow-leaflets-logo.svg";
import "./Navbar.css";

const navItems = [
  { to: "/home", label: "Home", Icon: HomeIcon },
  { to: "/logbooks", label: "Logbooks", Icon: BookOpenIcon },
  { to: "/history", label: "History", Icon: ClockIcon },
];

export const Navbar = () => {
  return (
    <aside className="side-nav">
      <div className="side-nav__header">
        <div className="side-nav__logo-container">
          <img src={Logo} alt="FlowLeaflets Logo" className="side-nav__logo" />
          <p className="side-nav__brand">FlowLeaflets</p>
        </div>
      </div>
      <nav className="side-nav__menu">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `side-nav__menu-item${
                isActive ? " side-nav__menu-item--active" : ""
              }`
            }
          >
            <div className="side-nav__menu-item-content">
              <Icon className="side-nav__menu-icon" />
              <p className="side-nav__menu-text">{label}</p>
            </div>
          </NavLink>
        ))}
      </nav>
      <ProfileBar />
    </aside>
  );
};
