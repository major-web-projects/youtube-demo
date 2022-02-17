import React, { useEffect, useState } from "react";

import Link from "next/link";
import { toast } from "react-toastify";
import { signupAction } from "../../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const redirect = router.query.redirect;

  const toggleShowPassword = (e) => {
    e.preventDefault();
    console.log("click");
    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
      passwordConfirm,
      agreeToTerms,
    };

    dispatch(signupAction(formData))
      .then(() => {
        toast.success("Successfully registered");
        if (redirect) {
          return router.push(redirect);
        }
        return router.push("/dashboard");
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    if (user) {
      if (redirect) {
        return router.push(redirect);
      }
      return router.push("/dashboard");
    }
  }, [user]);
  return (
    <div className="container-fluid  mt-5 pt-5 p-0">
      <div className="row align-items-center justify-content-center min-vh-100 gx-0">
        <div className="col-12 col-md-6 col-lg-6">
          <div className="card card-shadow border-0">
            <div className="card-body">
              <div className="row g-6">
                <div className="col-12">
                  <div className="text-center">
                    <h3 className="fw-bold mb-2">Sign Up</h3>
                    <p>
                      Quickly sign up for your account and start advertising for
                      free. Fill the form below as required .{" "}
                    </p>
                  </div>
                </div>
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className=" mb-2">
                    <label className="form-label" htmlFor="signup-name">
                      Username <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="signup-name"
                      placeholder="Enter your name or business name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label" htmlFor="signup-email">
                      Email address <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="signup-email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor="signup-password">
                        Password{" "}
                        <span className="fs-sm text-muted">min. 8 char</span>
                        <span className="text-danger">*</span>
                      </label>
                      <div className="password input-group">
                        <input
                          className="form-control border-end-0"
                          type={isShowPassword ? "text" : "password"}
                          id="signup-password"
                          minLength={8}
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
                            className="password-toggle"
                            aria-label="Show/hide password"
                          >
                            <span
                              className={
                                isShowPassword
                                  ? "fas fa-eye-slash"
                                  : "fas fa-eye"
                              }
                            ></span>
                          </label>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        className="form-label"
                        htmlFor="signup-password-confirm"
                      >
                        Confirm password
                      </label>
                      <div className="password-toggl input-group">
                        <input
                          className="form-control border-end-0"
                          type={isShowPassword ? "text" : "password"}
                          id="signup-password-confirm"
                          minLength={8}
                          required
                          value={passwordConfirm}
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                        <a
                          className="text-dark input-group-text border-start-0"
                          type="button"
                          onClick={toggleShowPassword}
                        >
                          <label
                            className="password-toggle"
                            aria-label="Show/hide password"
                          >
                            <span
                              className={
                                isShowPassword
                                  ? "fas fa-eye-slash"
                                  : "fas fa-eye"
                              }
                            ></span>
                          </label>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="agree-to-terms"
                      required
                      value={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="agree-to-terms"
                    >
                      I agree to the nomayini.com{" "}
                      <Link href="/terms">
                        <a>Terms of Use</a>
                      </Link>{" "}
                      and{" "}
                      <Link href="/policy">
                        <a>Privacy Policy</a>
                      </Link>{" "}
                      and agree to receive newsletters and promo offers from
                      Nomayini.com.
                    </label>
                  </div>
                  <button
                    className="btn btn-primary btn-lg rounded-pill w-100"
                    type="submit"
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="text-center mt-8">
            <p>
              Already have an account?{" "}
              <Link href="/auth/signin">
                <a>Sign in</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
