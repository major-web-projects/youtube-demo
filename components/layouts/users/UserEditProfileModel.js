import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { uploadProfilePicAction } from "../../../store/actions/authAction";

// const UserEditProfileModel = ({ show, handleClose }) => {
//   const [avatar, setAvatar] = useState();

//   const dispatch = useDispatch();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (avatar) {
//       const formData = new FormData();
//       formData.set("avatar", avatar);

//       dispatch(uploadProfilePicAction(formData)).then(
//         () => {
//           toast.success("Image successfully uploaded!!");
//           setAvatar(null);
//           handleClose();
//         },
//         (error) => toast.error(error)
//       );
//     }
//   };
//   return (
//     <>
//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//         centered
//       >
//         <Form onSubmit={handleSubmit} encType="multipart/form-data">
//           <Modal.Header closeButton>
//             <Modal.Name></Modal.Name>
//           </Modal.Header>
//           <Modal.Body>
//             <Form.Group className="m-3">
//               {/* <Form.Label>Default file input example</Form.Label> */}
//               <Form.Control
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setAvatar(e.target.files[0])}
//               />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer className="d-flex justify-content-start">

//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </>
//   );
// };

function UserEditProfileModel(props) {
  const [avatar, setAvatar] = useState();

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatar) {
      const formData = new FormData();
      formData.set("avatar", avatar);

      dispatch(uploadProfilePicAction(formData)).then(
        () => {
          toast.success("Image successfully uploaded!!");
          setAvatar(null);
          props.onHide();
        },
        (error) => toast.error(error)
      );
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Profile Picture
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="m-3">
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!avatar}>
          <i className="fas fa-upload opacity-60 mt-1 me-2" /> Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserEditProfileModel;
