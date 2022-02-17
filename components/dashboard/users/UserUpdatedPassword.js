import React, { useState } from "react";

import Link from "next/link";
import { toast } from "react-toastify";
import { updatePasswordAction } from "../../../store/actions/authAction";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";

const UserUpdatedPassword = () => {
  const [passwordCurrent, setPasswordCurrent] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const toggleShowPassword = (e) => {
    e.preventDefault();

    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { passwordCurrent, password, passwordConfirm };

    dispatch(updatePasswordAction(formData))
      .then(() => {
        toast.success("Your password was successfully updated");
      })
      .catch((error) => toast.error(error));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row align-items-end mb-2">
        <div className=" col-sm-6 mb-2">
          <label className="form-label" htmlFor="password">
            Old Password <span className="fs-sm text-muted">min. 8 char</span>
          </label>
          <div className="input-group">
            <input
              className="form-control"
              type={isShowOldPassword ? "text" : "password"}
              id="password"
              minLength={8}
              required
              value={passwordCurrent}
              onChange={(e) => setPasswordCurrent(e.target.value)}
            />
            <a
              className="password-toggle-check text-dark btn btn-light"
              type="button"
              onClick={() => setIsShowOldPassword(!isShowOldPassword)}
            >
              <label
                className="password-toggle-btn"
                aria-label="Show/hide password"
              >
                <span
                  className={
                    isShowOldPassword ? "fas fa-eye-slash" : "fas fa-eye"
                  }
                ></span>
              </label>
            </a>
          </div>
        </div>
        <div className=" col-sm-6 mb-2">
          <a className="d-inline-block mb-2" href="#">
            Forgot password?
          </a>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-sm-6 mb-2">
          <label className="form-label" htmlFor="password">
            New Password <span className="fs-sm text-muted">min. 8 char</span>
          </label>
          <div className="input-group">
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
              className="password-toggle-check text-dark  btn btn-light"
              type="button"
              onClick={toggleShowPassword}
            >
              <label
                className="password-toggle-btn"
                aria-label="Show/hide password"
              >
                <span
                  className={isShowPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                ></span>
              </label>
            </a>
          </div>
        </div>
        <div className="col-sm-6 mb-2">
          <label className="form-label" htmlFor="passwordConfirm">
            Confirm New password
          </label>
          <div className="input-group">
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
              className="password-toggle-check text-dark  btn btn-light"
              type="button"
              onClick={toggleShowPassword}
            >
              <label
                className="password-toggle-btn"
                aria-label="Show/hide password"
              >
                <span
                  className={isShowPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                ></span>
              </label>
            </a>
          </div>
        </div>
      </div>
      <button
        className="btn btn-outline-primary btn-lg  w-100"
        type="submit"
        disabled={!passwordCurrent || !password || !passwordConfirm}
      >
        Update Password
      </button>
    </form>
  );
};

export default UserUpdatedPassword;
