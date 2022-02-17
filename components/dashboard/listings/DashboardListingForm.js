import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import listingAction from "../../../store/actions/listingAction";
import { useRouter } from "next/router";
import DashboardChannelFormItem from "./DashboardChannelFormItem";

const DashboardListingForm = ({ categories = [] }) => {
  const [keyword, setKeyword] = useState("GoogleDevelopers");
  const [channelSearchType, setChannelSearchType] = useState("id");
  const [channel, setChannel] = useState({});
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const { isListingLoading, youtubeChannelList } = useSelector(
    (state) => state.listing
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = {
    //   name,
    //   tagline,
    //   description,
    //   category,
    //   subs,
    // };

    if (channel.name && price) {
      const formData = { ...channel, price, category };
      return dispatch(listingAction.create(formData))
        .then((listing) => {
          toast.success("Business successfully added");
          router.push(`/dashboard/listings/${listing._id}`);
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      return toast.error("Please fill all the fields.");
    }
  };

  const handleChannelSearch = (e) => {
    e.preventDefault();

    if (keyword) {
      const formData = { keyword, channelSearchType };
      return dispatch(listingAction.searchChannel(formData))
        .then((listing) => {
          toast.success("Business successfully added");
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      return toast.error("Please fill all the fields.");
    }
  };

  const handleSetChannel = (e, channel) => {
    e.preventDefault();
    setChannel(channel);
  };

  return (
    <div>
      <form
        className="form-group d-block d-md-flex position-relative rounded-md-pill mb-2 mb-sm-4 mb-lg-5"
        onSubmit={handleChannelSearch}
      >
        <div className="input-group input-group-lg border-end-md col">
          <input
            className="form-control"
            type="text"
            placeholder="What are you looking for?"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <hr className="d-md-none my-2" />
        <div className="d-flex">
          <select
            className="form-select"
            style={{ minWidth: "200px" }}
            onChange={(e) => setChannelSearchType(e.target.value)}
            value={channelSearchType}
          >
            <option value="id">ID</option>
            <option value="forUsername">Username</option>
          </select>
          <button className="btn btn-primary btn-lg w-100" type="submit">
            Search
          </button>
        </div>
      </form>

      <section
        className="card card-body border-0 shadow-sm p-4 mb-4"
        id="basic-info"
      >
        <h2 className="h4 mb-0">
          <i className="fas fa-info-circle text-primary fs-5 mt-n1 me-2" />
          Your Channels
        </h2>
        <p>Please select one you want to sell</p>
        {youtubeChannelList.length !== 0 &&
          youtubeChannelList.map((item, index) => (
            <DashboardChannelFormItem
              channel={channel}
              item={item}
              handleSetChannel={handleSetChannel}
              key={index}
            />
          ))}
        {/* <pre> {JSON.stringify(channel, null, 2)}</pre> */}
        <div className="mb-3">
          <label className="form-label" htmlFor="ap-price">
            Price <span className="text-muted">*</span>
          </label>
          <input
            className="form-control"
            type="number"
            id="ap-price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>{" "}
        <div className=" mb-3">
          <label className="form-label" htmlFor="ap-category">
            Category <span className="text-danger">*</span>
          </label>

          <select
            className="form-select"
            id="ap-category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat._id} key={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </section>
      {/* Action buttons */}

      <div className="bg-light rounded-3 p-4 px-md-5">
        <button
          className="btn btn-primary btn-lg w-100 rounded-pill ms-sm-auto"
          onClick={handleSubmit}
          type="button"
        >
          Save<i className="fi-chevron-right fs-sm ms-2"></i>
        </button>
      </div>
    </div>
  );
};

export default DashboardListingForm;
