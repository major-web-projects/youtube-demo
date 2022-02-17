import Link from "next/link";
import React, { useEffect, useState } from "react";
import DeleteListingModal from "./DeleteListingModal";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";

const DashboardListingItem = ({ listing }) => {
  const [modalShow, setModalShow] = useState(false);
  const [listingStatus, setListingStatus] = useState("");

  const imgUrl = listing?.thumbnails?.medium?.url
    ? `${listing?.thumbnails?.medium?.url}`
    : `/images/defaults/missing_listing.png`;

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
    <div className="col-12">
      <div className="card bg-light card-hover mb-2">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-start">
              <Image
                height="120px"
                width="120px"
                src={imgUrl}
                alt="Listing"
                className="img-fluid rounded-start d-none d-sm-block"
              />
              <div className="ps-sm-3">
                <h2 className="h6 card-title pb-1 mb-2">{listing.name}</h2>
                <div className="fs-sm">
                  <div className="text-nowrap mb-2">
                    {listing?.category?.name}
                  </div>
                  <div className="text-nowrap">{listing.price}</div>
                  <div className="fs-sm">101 Views | 0 Emails | 0 Phone</div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column align-items-end justify-content-between">
              <Dropdown
                className="position-relative zindex-10 mb-3"
                align="end"
              >
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="btn btn-icon btn-light btn-xs shadow-sm"
                >
                  menu
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <button
                    className="btn dropdown-item bg-faded-accent btn-sm me-2"
                    type="button"
                    title="Promote"
                  >
                    <i className="fas fa-bullhorn text-accent"></i> Promote
                  </button>
                  <Link
                    href={`/dashboard/listings/edit?listingId=${listing._id}`}
                  >
                    <a
                      className="btn dropdown-item bg-faded-info btn-sm me-2"
                      title="Edit"
                    >
                      <i className="fas fa-edit text-info" /> Edit
                    </a>
                  </Link>

                  <button
                    className="btn dropdown-item bg-faded-danger btn-sm me-2"
                    type="button"
                    onClick={() => setModalShow(true)}
                    title="Delete"
                  >
                    <i className="fas fa-trash text-danger" /> Delete
                  </button>

                  <button
                    className="btn dropdown-item bg-faded-warning btn-sm "
                    type="button"
                    title="Deactivate"
                  >
                    <i className="fas fa-power-off text-warning" /> Deactivate
                  </button>
                </Dropdown.Menu>
              </Dropdown>

              <span className={`d-table badge bg-${listingStatus}`}>
                <b>{listing.status}</b>
              </span>
            </div>
          </div>
        </div>
      </div>

      {modalShow && (
        <DeleteListingModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          listing={listing}
        />
      )}
    </div>
  );
};

export default DashboardListingItem;
