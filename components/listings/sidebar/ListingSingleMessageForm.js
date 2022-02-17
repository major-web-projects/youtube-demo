import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import chatAction from "../../../store/actions/chatAction";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ListingUserMessage = ({ userId, listingId }) => {
  const [content, setContent] = useState("");
  const { chatRead } = useSelector((state) => state.chat);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      chatAction.create({
        content,
        messagedUserId: userId,
        listingId: listingId,
      })
    )
      .then(() => {
        toast.success("Message successfully sent");
        // router.push(`/dashboard/messages/${chatRead._id}`);
        setContent("");
      })
      .catch((error) => toast.error(error));
  };
  return (
    <form className="pb-2" method="post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows={6}
          placeholder="Your message"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {/* <div className="invalid-feedback">Please wirte your message!</div> */}
      </div>
      <button
        className="btn btn-primary d-block w-100"
        type="submit"
        disabled={!content}
      >
        Send
      </button>
    </form>
  );
};

export default ListingUserMessage;
