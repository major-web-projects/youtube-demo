import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSigninsList } from "../../../store/actions/authAction";

const UserSignins = () => {
  const { userSigninsList = [] } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loadUserSignins = async () => await dispatch(currentUserSigninsList());
  useEffect(() => {
    loadUserSignins();
  }, []);
  return (
    <div>
      {userSigninsList.map((au) => (
        <div className="d-flex border-bottom pb-3 mb-3" key={au._id}>
          <i className="fas fa-device-mobile fs-5 text-muted me-1" />
          <div className="ps-2">
            <div className="fw-bold mb-1">{au.os}</div>
            <span className="d-inline-block fs-sm text-muted border-end pe-2 me-2">
              {au.browser}
            </span>
            <span className="fs-sm text-muted">20 hours ago</span>
          </div>
          <div className="align-self-center ms-auto">
            <div className="dropdown">
              <button
                className="btn btn-icon btn-light btn-xs rounded-circle shadow-sm"
                type="button"
              >
                <i className="fas fa-dots-vertical" />
              </button>
              <ul
                className="dropdown-menu pb-3 my-1"
                aria-labelledby="contextMenu1"
              >
                <li>
                  <a className="dropdown-item text-body" href="#">
                    Not you?
                  </a>
                </li>
                <li>
                  <a className="d-block px-3" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserSignins;
