import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import listingAction from "../../../store/actions/listingAction";
import Image from "next/image";

import DashListingImages from "./DashListingImages";
import { toast } from "react-toastify";
import { useRouter } from "next/dist/client/router";

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

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "100%",
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

function ListingCoverImage() {
  const [files, setFiles] = useState([]);
  const { isListingLoading, listingRead, success, error } = useSelector(
    (state) => state.listing
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const listingId = router.query.listingId;
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    multiple: false,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const formData = new FormData();
      formData.append("name", "major");
      console.log(acceptedFiles);
      acceptedFiles &&
        acceptedFiles.map((file) => {
          formData.append("image", file);
        });
      dispatch(listingAction.uploadCoverImage({ formData, listingId })).then(
        () => {
          toast.success("Images successfully uploaded");
        }
      );
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div
      style={thumb}
      key={file._id}
      className="position-relative flex-shrink-0"
    >
      <div style={thumbInner}>
        <Image height="200px" width="200px" src={file.url} alt="image" />
      </div>

      <button
        onClick={(e) => handleRemoveImage(e, file, listingId)}
        className="btn btn-icon text-danger shadow-lg position-absolute end-0 bottom-0"
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  ));

  const handleRemoveImage = (e, image, listId) => {
    e.preventDefault();
    const formData = image;
    dispatch(listingAction.removeImage({ formData, listingId: listId }));
  };

  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (listingRead && listingRead.coverimage) {
      setFiles([listingRead.coverimage]);
    }
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [error, isListingLoading, success, files]);

  return (
    <>
      <Form encType="multipart/form-data">
        <section className="row">
          <div {...getRootProps({ style, className: "dropzone col" })}>
            <input {...getInputProps()} />
            <p>Drag n drop some files here, or click to select files</p>
          </div>
          <aside style={thumbsContainer} className="col-4">
            {thumbs}
          </aside>
        </section>
      </Form>
    </>
  );
}

export default ListingCoverImage;
