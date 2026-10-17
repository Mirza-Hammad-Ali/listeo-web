import { useState } from "react";
import {
  MapPin,
  Home,
  Layers,
  User,
  FileText,
  ShoppingCart,
  LogIn,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import "./Navbar.css";

const navItems = [
  {
    label: "Home",
    Icon: Home,
    active: true,
    items: ["Home 1", "Home 2", "Home with Map"],
  },
  {
    label: "Listings Layouts",
    Icon: Layers,
    items: ["Grid Layout", "List Layout", "Map Layout"],
  },
  {
    label: "User Panel",
    Icon: User,
    items: ["Dashboard", "My Listings", "Messages"],
  },
  {
    label: "Pages",
    Icon: FileText,
    items: ["About Us", "Blog", "Contact", "Pricing"],
  },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <a href="#" className="listeo-logo">
          <MapPin className="logo-pin" />
          <span>listeo</span>
        </a>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

        <nav className={`navbar-links ${mobileOpen ? "mobile-open" : ""}`}>
          {navItems.map(({ label, Icon, active, items }) => (
            <div className="nav-dropdown-wrap" key={label}>
              <button
                className={`nav-link ${active ? "nav-link-active" : ""}`}
                onClick={() => setOpenMenu(openMenu === label ? "" : label)}
              >
                <Icon size={21} strokeWidth={2} />
                <span>{label}</span>
                <ChevronDown
                  size={16}
                  className={`nav-arrow ${
                    openMenu === label ? "nav-arrow-open" : ""
                  }`}
                />
              </button>

              {openMenu === label && (
                <div className="nav-dropdown">
                  {items.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setOpenMenu("");
                        setMobileOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="navbar-actions">
          <button
            className="cart-button"
            aria-label="Shopping cart"
            onClick={() => alert("Your cart is empty!")}
          >
            <ShoppingCart size={25} />
            <span className="cart-count">0</span>
          </button>

          <button className="sign-in-button" onClick={() => alert("Sign In")}>
            <LogIn size={22} />
            <span>Sign In</span>
          </button>

          <button
            className="add-listing-button"
            onClick={() => alert("Add Listing")}
          >
            <MapPin size={22} />
            <span>Add Listing</span>
          </button>
        </div>
      </div>
    </header>
  );
}
