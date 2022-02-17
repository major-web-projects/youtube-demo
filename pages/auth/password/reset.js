import React, { useState } from "react";

import Link from "next/link";
import { toast } from "react-toastify";
import {
  passwordResetAction,
  signupAction,
} from "../../../store/actions/authAction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";

const PasswordResetPage = () => {
  const [otpCode, setOtpCode] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const toggleShowPassword = (e) => {
    e.preventDefault();

    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { otpCode, password, passwordConfirm };

    dispatch(passwordResetAction(formData))
      .then(() => {
        toast.success("Your password was successfully reseted");
        router.push("/auth/signin");
      })
      .catch((error) => toast.error(error));
  };
  return (
    <div className="container-fluid mt-5  p-0">
      <div className="row align-items-center justify-content-center min-vh-100 gx-0">
        <div className="col-12 col-md-5 col-lg-4">
          <div className="card card-shadow border-0">
            <div className="card-body">
              <div className="row g-6">
                <div className="col-12">
                  <div className="text-center">
                    <h3 className="fw-bold mb-2">Reset Password</h3>
                    <p>Follow the easy steps</p>
                  </div>
                </div>
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="mb-2">
                    <label className="form-label" htmlFor="otpCode">
                      OTP{" "}
                      <span className="fs-sm text-muted">
                        Get the code from your email
                      </span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="otpCode"
                      placeholder="Enter the code we sent to your email"
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label" htmlFor="password">
                      New Password{" "}
                      <span className="fs-sm text-muted">min. 8 char</span>
                    </label>
                    <div className="password-toggle">
                      <input
                        className="form-control"
                        type={isShowPassword ? "text" : "password"}
                        id="password"
                        minLength={8}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <a
                        className="password-toggle-check text-dark"
                        type="button"
                        onClick={toggleShowPassword}
                      >
                        <label
                          className="password-toggle-btn"
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
                  <div className="mb-2">
                    <label className="form-label" htmlFor="passwordConfirm">
                      Confirm New password
                    </label>
                    <div className="password-toggle">
                      <input
                        className="form-control"
                        type={isShowPassword ? "text" : "password"}
                        id="passwordConfirm"
                        minLength={8}
                        required
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                      <a
                        className="password-toggle-check text-dark"
                        type="button"
                        onClick={toggleShowPassword}
                      >
                        <label
                          className="password-toggle-btn"
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
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
          {/* Text */}
          <div className="text-center mt-8">
            <p>
              OTP code already expired?{" "}
              <Link href="/auth/password/forgot">
                <a>please reset password again</a>
              </Link>
            </p>
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

export default PasswordResetPage;
