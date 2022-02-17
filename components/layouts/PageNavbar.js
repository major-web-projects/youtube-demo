import React from "react";
import Link from "next/link";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { signoutAction } from "../../store/actions/authAction";
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import CategoryCard from "./cards/CategoryCard";
import Image from "next/image";

const PageNavbar = ({ auth: { user }, cart, signOut }) => {
  const router = useRouter();
  const { isCategoryLoading, categoryList } = useSelector(
    (state) => state.category
  );
  const handleSignOut = (e) => {
    e.preventDefault();
    signOut().then(
      () => {
        toast.success("Goodbye, visit again");
        router.push("/");
      },
      (error) => toast.error(error)
    );
  };
  return (
    <>
      <Navbar
        bg="dark"
        fixed="top"
        expand="lg"
        variant="dark"
        className="shadow-sm"
      >
        <div className="container">
          <Link href="/" passHref>
            <Navbar.Brand href="/" className="me-3 me-xl-4 position-relative">
              Digitalize{" "}
              <sup style={{ fontSize: "0.5rem", top: "-1em" }}>beta v1</sup>
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="navbarNav">
            <span className="navbar-toggler-icon" />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbarNav">
            <Nav
              className="navbar-nav-scroll ms-auto"
              style={{ maxHeight: "35rem" }}
            >
              {/* Menu items*/}
              <Link href="/" passHref>
                <Nav.Link href="/" as="a">
                  Home
                </Nav.Link>
              </Link>
              <Link href="/listings" passHref>
                <Nav.Link href="/listings" as="a">
                  Marketplace
                </Nav.Link>
              </Link>

              <Link href="/contact" passHref>
                <Nav.Link href="/contact" as="a">
                  Contact
                </Nav.Link>
              </Link>

              {user ? (
                <>
                  <NavDropdown
                    title={<>{user.name}</>}
                    id="basic-nav-dropdown"
                    className="text-light order-lg-3"
                    align="end"
                  >
                    <div
                      className="d-flex align-items-start border-bottom px-3 py-1 mb-2"
                      style={{ width: "16rem" }}
                    >
                      <Image
                        height="48px"
                        width="48px"
                        className="img-fluid rounded-circle"
                        src={
                          user?.avatar.full_url || "/images/defaults/avatar.jpg"
                        }
                        alt={user.name || "logo"}
                      />
                      <div className="ps-2">
                        <h6 className="fs-base mb-0">{user.name || "User"}</h6>

                        <div className="fs-xs py-2">{user.email}</div>
                      </div>
                    </div>

                    <Link href="/dashboard">
                      <a className="dropdown-item">
                        <i className="fas fa-user opacity-60 me-2" />
                        Account
                      </a>
                    </Link>

                    <Link href="/dashboard/listings">
                      <a className="dropdown-item">
                        <i className="fas fa-list opacity-60 me-2" />
                        My Listings
                      </a>
                    </Link>

                    <Link href="/dashboard/settings">
                      <a className="dropdown-item">
                        <i className="fas fa-lock opacity-60 me-2" />
                        Security
                      </a>
                    </Link>

                    <NavDropdown.Divider />
                    <a
                      className="dropdown-item"
                      type="button"
                      onClick={handleSignOut}
                    >
                      <i className="fas fa-sign-out-alt  opacity-60 me-2" />{" "}
                      Signout
                    </a>
                  </NavDropdown>
                </>
              ) : (
                <NavDropdown
                  title={
                    <>
                      <i className="fi-user me-2" />
                      <span className="namr">Account</span>
                    </>
                  }
                  id="basic-nav-dropdown"
                  className="text-light order-lg-3"
                  align="end"
                >
                  <Link href="/auth/signin" passHref>
                    <NavDropdown.Item href="/auth/signin" as="a">
                      Sign in
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <Link href="/auth/signup" passHref>
                    <NavDropdown.Item href="/auth/signup" as="a">
                      Sign Up
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <style jsx>{`
        #dropdown-basic .dropdown-toggle::after {
          display: none;
        }
      `}</style>
    </>
  );
};

export default connect((state) => ({ auth: state.auth, cart: state.cart }), {
  signOut: signoutAction,
})(PageNavbar);
