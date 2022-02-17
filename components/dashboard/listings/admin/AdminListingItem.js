import Link from "next/link";
import React, { useEffect, useState } from "react";
import DeleteListingModal from "../DeleteListingModal";

const AdminCategoryItem = ({ listing, index, handleRemove }) => {
  const [showForm, setShowForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const toggleShowForm = () => setShowForm(!showForm);
  const [listingStatus, setListingStatus] = useState("");

  useEffect(() => {
    switch (listing.status) {
      case "active":
        setListingStatus("success");
        break;
      case "peding":
        setListingStatus("warning");
        break;
      case "expired":
        setListingStatus("danger");
        break;
      case "archived":
        setListingStatus("dark");
        break;
      default:
        setListingStatus("info");
        break;
    }
  }, []);
  return (
    <tr>
      <td>{listing.name}</td>
      <td>{listing?.user?.name}</td>
      <td className="mb-0 mx-center">{listing?.viewCount}</td>
      <td className="mb-0 mx-center">{listing?.subscriberCount}</td>
      <td className="mb-0 mx-center">{listing?.videoCount}</td>{" "}
      <td className="mb-0 mx-center">
        <span className={`badge bg-${listingStatus}`}>
          <b>{listing.status}</b>
        </span>
      </td>
      <td>
        <Link
          href={`/dashboard/listings/[listingId]`}
          as={`/dashboard/listings/${listing._id}`}
        >
          <a className="btnbg-faded-info btn-sm me-2">
            <i className="fas fa-eye text-primary" />
          </a>
        </Link>
        <Link href={`/dashboard/listings/edit?listingId=${listing._id}`}>
          <a className="btn bg-faded-info btn-sm me-2" title="Edit">
            <i className="fas fa-edit text-info" />
          </a>
        </Link>
        <button
          className="btn bg-faded-danger btn-sm me-2"
          type="button"
          onClick={() => setModalShow(true)}
          title="Delete"
        >
          <i className="fas fa-trash text-danger" />
        </button>
      </td>
      {modalShow && (
        <DeleteListingModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          listing={listing}
        />
      )}
    </tr>
  );
};

export default AdminCategoryItem;
