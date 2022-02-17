import { Modal, Button } from "react-bootstrap";
import React from "react";
import listingAction from "../../../store/actions/listingAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const DeleteListingModal = (props) => {
  const dispatch = useDispatch();
  const removeListing = (listingId) =>
    dispatch(listingAction.remove(listingId))
      .then(() => {
        toast.success("Listing Removed");
      })
      .catch((error) => {
        toast.error(error);
      });
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure you want to delete this listing?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.listing.name}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="secondary">
          Cancel
        </Button>

        <button
          className="btn btn-danger"
          onClick={() => removeListing(props.listing._id)}
        >
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteListingModal;
