import { Collapse } from "react-bootstrap";
import React, { useState } from "react";

const ProfileItem = ({
  label = "field label",
  defaultValue = "",
  inputType = "text",
  onChangeHandler,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-bottom pb-3 mb-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="pe-2">
          <label className="form-label fw-bold">{label}</label>
          <div>{defaultValue || "Not specified"}</div>
        </div>
        <div className="me-n3">
          <a
            className="nav-link py-0"
            onClick={() => setOpen(!open)}
            type="button"
          >
            <i className="fas fa-edit" />
          </a>
        </div>
      </div>
      <Collapse in={open} className="collapse">
        <input
          className="form-control mt-3"
          type={inputType}
          value={defaultValue}
          onChange={onChangeHandler}
        />
      </Collapse>
    </div>
  );
};

export default ProfileItem;
