import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signinAction } from "../../store/actions/authAction";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import UserSignInLayout from "../../components/layouts/users/UserSignInLayout";

const SigninPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();
  const redirect = router.query.redirect;
  const dispatch = useDispatch();
  const toggleShowPassword = (e) => {
    e.preventDefault();
    setIsShowPassword(!isShowPassword);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { email, password };
    dispatch(signinAction(formData)).then(
      () => {
        toast.success("Welcome back!");
        if (redirect) {
          return router.push(redirect);
        }
        return router.push("/");
      },
      (error) => toast.error(error)
    );
  };

  useEffect(() => {
    if (user) {
      if (redirect) {
        return router.push(redirect);
      }
      return router.push("/");
    }
  }, [user]);

  return (
    <div className="container-fluid">
      <div className="row align-items-center justify-content-center min-vh-100 gx-0">
        <div className="col-12 col-md-6 col-lg-6">
          <div className="card card-shadow border-0">
            <div className="card-body">
              <div className="row g-6">
                <div className="col-12 mt-5 mb-2 pt-5">
                  <div className="text-center">
                    <h3 className="fw-bold mb-2">Sign In</h3>
                    <p>Login to your account</p>
                  </div>
                </div>
                <form className="needs-validation" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label mb-2" htmlFor="signin-email">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="signin-email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label
                        className="form-label mb-0"
                        htmlFor="signin-password"
                      >
                        Password
                      </label>

                      <Link href="/auth/password/forgot">
                        <a className="fs-sm">Forgot password?</a>
                      </Link>
                    </div>
                    <div className="password-toggle input-group">
                      <input
                        className="form-control border-end-0"
                        type={isShowPassword ? "text" : "password"}
                        id="signin-password"
                        placeholder="Enter password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <a
                        className="text-dark input-group-text border-start-0"
                        type="button"
                        onClick={toggleShowPassword}
                      >
                        <label
                          className="password"
                          aria-label="Show/hide password"
                        >
                          <span
                            className={
                              isShowPassword ? "fas fa-eye-slash" : "fas fa-eye"
                            }
                          ></span>
                        </label>
                      </a>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-lg rounded-pill w-100"
                    type="submit"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="text-center mt-8">
            <p>
              Do not have an account yet?{" "}
              <Link href="/auth/signup">
                <a>Sign up</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

SigninPage.PageLayout = UserSignInLayout;
export default SigninPage;
