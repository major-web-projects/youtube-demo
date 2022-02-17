import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import listingAction from "../../../store/actions/listingAction";
import { useRouter } from "next/router";

const DashboardListingFormEdit = ({ categories = [], listing }) => {
  const [name, setName] = useState(listing?.name || "");
  const [description, setDescription] = useState(listing?.description || "");
  const [price, setPrice] = useState(listing?.price || 0);
  const [category, setCategory] = useState(listing?.category?._id || "");

  const [image, setImage] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isListingLoading, youtubeChannelList } = useSelector(
    (state) => state.listing
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      price,
      category,
    };

    dispatch(listingAction.update({ formData, listingId: listing._id }))
      .then(() => {
        toast.success("Listing updated successfully");
        router.push(`/dashboard/listings/${listing._id}`);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <section
        className="card card-body border-0 shadow-sm p-4 mb-4"
        id="basic-info"
      >
        <h2 className="h4 mb-4">
          <i className="fas fa-info-circle text-primary fs-5 mt-n1 me-2" />
          Basic info
        </h2>
        <div className="mb-3">
          <label className="form-label" htmlFor="ap-name">
            Name <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="text"
            id="ap-name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <span className="form-text">48 characters left</span>
        </div>

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

        <div className="mb-3" id="price">
          <label className="form-label" htmlFor="ap-price">
            Price <span className="text-danger">*</span>
          </label>

          <input
            className="form-control w-100 me-2 mb-2"
            type="number"
            id="ap-price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="ap-description">
            Description
          </label>

          <textarea
            className="form-control"
            value={description}
            name="description"
            rows="5"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      </section>

      {/* Action buttons */}
      <section className="d-sm-flex justify-content-between pt-2">
        <button className="btn btn-primary btn-lg d-block mb-2" type="submit">
          Save changes and continue
        </button>
      </section>
    </form>
  );
};

export default DashboardListingFormEdit;
