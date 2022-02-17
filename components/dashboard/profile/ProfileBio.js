import { Collapse } from "react-bootstrap";
import React, { useState } from "react";

const ProfileBio = ({
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
          <label className="form-label fw-bold"> Short bio</label>
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
        <textarea
          className="form-control mt-3"
          id="account-bio"
          rows={6}
          placeholder="Write your bio here. It will be displayed on your public profile."
          value={defaultValue}
          onChange={onChangeHandler}
        />
      </Collapse>
    </div>
  );
};

export default ProfileBio;
