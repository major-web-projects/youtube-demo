import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { toast } from "react-toastify";
import listingAction from "../../../store/actions/listingAction";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",

  position: "relative",
  padding: "3rem 1rem",
  transition: "border-color 0.15s ease-in-out,box-shadow 0.15s ease-in-out",
  border: "2px dashed #dae1e7",
  backgroundColor: "#fff",
  textAlign: "center",
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumb = {};

const thumbInner = {
  height: 100,
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  padding: 4,
  boxSizing: "border-box",
};

const img = {
  height: "100%",
};

const DashListingImages = ({ listingId, images, deletable = false }) => {
  const dispatch = useDispatch();

  const { isListingLoading, listingRead, success, error } = useSelector(
    (state) => state.listing
  );
  const handleRemoveImage = (e, file) => {
    e.preventDefault();
  };

  const thumbs = images.map((file) => (
    <div
      style={thumb}
      className="col-lg-2 col-sm-4 py-1 text-center"
      key={file}
    >
      <div style={thumbInner}>
        <Image
          height="200px"
          width="200px"
          src={file.url}
          alt="image"
          className="img-fluid"
        />
      </div>
      {deletable && (
        <button
          className="btn btn-danger btn-sm"
          onClick={(e) => handleRemoveImage(e, file)}
        >
          <i className="fa fa-trash"></i>
        </button>
      )}
    </div>
  ));

  // useEffect(() => {
  //   if (!isListingLoading && success && listingRead && deletable) {
  //     toast.success("Image removed");
  //   }
  //   // if (error) {
  //   //   toast.error(error);
  //   // }
  //   return () => {
  //     dispatch(listingAction.clear());
  //   };
  // }, [isListingLoading]);

  return (
    <div className="border-top py-1">
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
  );
};

export default DashListingImages;
