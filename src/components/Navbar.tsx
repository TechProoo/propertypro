import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../assets/logo.png";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "About Us", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contacts", href: "#" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar-header">
      <nav className="navbar">
        <a href="#" className="navbar-logo">
          <img src={Logo} className="w-30" alt="" />
        </a>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`navbar-links${menuOpen ? " open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="navbar-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
