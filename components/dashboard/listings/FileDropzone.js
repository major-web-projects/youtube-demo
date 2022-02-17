import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import listingAction from "../../../store/actions/listingAction";
import Image from "next/image";

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
  width: 100,
  height: 100,
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

function FileDropzone() {
  const [files, setFiles] = useState([]);
  const { isListingLoading, listingRead, success, error } = useSelector(
    (state) => state.listing
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
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
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <Image height="200px" width="200px" src={file.preview} alt="image" />
      </div>
    </div>
  ));

  const submitHandler = (e) => {
    e.preventDefault();
    const listingData = new FormData();
    listingData.append("name", "major");
    files &&
      files.map((file) => {
        listingData.append("images", file);
      });

    dispatch(
      listingAction.upload({ listingData, listingId: props.listing._id })
    );
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
    if (!isListingLoading && success && listingRead) {
      toast.success("Images successfully uploaded");
    }
    if (error) {
      toast.error(error);
    }
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [error, isListingLoading, success, files]);

  return (
    <>
      <Form onSubmit={submitHandler} encType="multipart/form-data">
        <section className="">
          <div {...getRootProps({ style, className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag n drop some files here, or click to select files</p>
          </div>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
      </Form>
    </>
  );
}

export default FileDropzone;
