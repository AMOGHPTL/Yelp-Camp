import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { label: "Home", link: "/" },
    { label: "Campgrounds", link: "/campgrounds" },
    { label: "New Campground", link: "/campgrounds/new" },
  ];

  return (
    <nav className="bg-black text-white shadow-lg w-full">
      <div className="px-6">
        <div className="flex gap-10 items-center h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 font-bold text-xl cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            YelpCamp
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="px-3 py-2 text-gray-400 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              {isOpen ? (
                <XMarkIcon className="h-5" />
              ) : (
                <Bars3Icon className="h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
