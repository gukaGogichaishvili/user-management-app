import { Container, Flex } from "@radix-ui/themes";
import React from "react";
import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FaWpforms } from "react-icons/fa";
import { MdFormatListNumbered } from "react-icons/md";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const links = [
    { label: "Form", to: "/form", icon: <FaWpforms /> },
    { label: "List", to: "/list", icon: <MdFormatListNumbered /> },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    className={classnames({
                      "nav-link": true,
                      "text-zinc-900 text-rose-500": link.to === currentPath,
                      "text-lg": true,
                      "flex flex-row gap-2 items-center": true,
                    })}
                    to={link.to}
                  >
                    <span className="icon-class">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
