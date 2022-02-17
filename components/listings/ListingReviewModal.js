import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import reviewAction from "../../store/actions/reviewAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import StarRatings from "react-star-ratings";

const ListingReviewModal = (props) => {
  const [ratings, setRatings] = useState(3);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const submitRating = (e) => {
    e.preventDefault();
    const formData = { ratings, text, listing: props.listing._id };
    dispatch(reviewAction.create(formData))
      .then(() => {
        toast.success("Review Added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-name-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Name id="contained-modal-name-vcenter">
          Leave a review
        </Modal.Name>
      </Modal.Header>
      <Modal.Body>
        <form className="needs-validation" onSubmit={submitRating}>
          <div className="mb-3">
            <label className="form-label" htmlFor="review-rating">
              Rating <span className="text-danger">*</span>
            </label>

            <div>
              <StarRatings
                rating={ratings}
                starRatedColor="red"
                changeRating={(value, name) => {
                  setRatings(value);
                }}
                numberOfStars={5}
                name={props.listing._id}
              />
            </div>
            <div className="invalid-feedback">Please rate the property.</div>
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="review-text">
              Review <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              id="review-text"
              rows={5}
              placeholder="Your review message"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="invalid-feedback">Please write your review.</div>
          </div>
          <button className="btn btn-primary d-block w-100 mb-4" type="submit">
            Submit a review
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ListingReviewModal;
