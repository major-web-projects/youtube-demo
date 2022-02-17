import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { passwordForgotAction } from "../../../store/actions/authAction";

const ForgotPage = () => {
  const [email, setEmail] = useState();

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { email };

    dispatch(passwordForgotAction(formData)).then(
      () => {
        toast.success("Reset password successfully sent to your email");
        router.push("/auth/password/reset");
      },
      (error) => toast.error(error)
    );
  };

  return (
    <div className="row align-items-center justify-content-center min-vh-100 gx-0">
      <div className="col-12 col-md-5 col-lg-4">
        <div className="card card-shadow border-0">
          <div className="card-body">
            <div className="row g-6">
              <div className="col-12">
                <div className="text-center">
                  <h3 className="fw-bold mb-2">Password Reset</h3>
                  <p>Enter your email to reset password</p>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
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
                <div className="col-12">
                  <button
                    className="btn btn-block btn-lg btn-primary w-100"
                    type="submit"
                  >
                    Send OTP
                  </button>
                </div>
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
  );
};

export default ForgotPage;
