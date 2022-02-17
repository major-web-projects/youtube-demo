import React, { useState } from "react";
import Pagination from "../../../layouts/Pagination";
import AdminListingItem from "./AdminListingItem";

const AdminListingContainer = ({ listings = [], meta, handleRemove }) => {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="listing-list">
      <div className="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2"></div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>PostedBy</th>
              <th>Views</th>
              <th>Subscribers</th>
              <th>Views</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, index) => (
              <AdminListingItem
                listing={listing}
                index={index}
                key={listing._id + index}
                handleRemove={handleRemove}
                listings={listings}
              />
            ))}
          </tbody>
        </table>
      </div>
      {meta && meta.totalPages > 1 && (
        <Pagination
          totalRecords={meta.totalListings}
          totalPages={meta.totalPages}
          pageLimit={meta.limit}
          currentPage={meta.page}
          hasPrevPage={meta.hasPrevPage}
          hasNextPage={meta.hasNextPage}
          pageNeighbours={3}
          onPageChanged={(data) => onPageChanged(data)}
        />
      )}
    </div>
  );
};

export default AdminListingContainer;
