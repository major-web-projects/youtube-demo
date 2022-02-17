import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateProfileAction } from "../../../store/actions/authAction";
import ProfileBio from "./ProfileBio";
import ProfileItem from "./ProfileItem";

const ProfileContainer = ({ user }) => {
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.contacts?.phone);
  const [bio, setBio] = useState(user?.bio);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      phone,
      bio,
    };

    dispatch(updateProfileAction(formData))
      .then(() => toast.success("profile successfully updated"))
      .catch((error) => toast.error(error));
  };
  return (
    <div className="border rounded-3 p-3 mb-4" id="personal-info">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Name*/}
        <ProfileItem
          label="
          Username"
          defaultValue={name}
          inputType="text"
          onChangeHandler={(e) => setName(e.target.value)}
        />
        {/* Email*/}
        <ProfileItem
          label="Email"
          defaultValue={email}
          inputType="text"
          onChangeHandler={(e) => setEmail(e.target.value)}
        />

        {/* Phone number*/}
        <ProfileItem
          label="Phone number"
          defaultValue={phone}
          inputType="text"
          onChangeHandler={(e) => setPhone(e.target.value)}
        />

        {/* Bio */}
        <ProfileBio
          defaultValue={bio}
          onChangeHandler={(e) => setBio(e.target.value)}
          placeholder="Enter bio"
        />

        <div className="d-flex align-items-center justify-content-between pb-1">
          <button
            className="btn btn-primary px-3 px-sm-4"
            type="submit"
            onClick={submitHandler}
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileContainer;
