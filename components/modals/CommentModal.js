import { closeCommentModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import TweetInputIcon from "../ui/TweetInputIcon";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useState } from "react";

export default function CommentModal() {
  const [comment, setComment] = useState("");

  const isOpen = useSelector((state) => state.modals.commentModalOpen);
  const tweetDetails = useSelector((state) => state.modals.commentTweetDetails);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function sendComment() {
    const docRef = doc(db, "posts", tweetDetails.id);

    const commentDetails = {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      uid: user.uid,
      comment: comment,
    };

    await updateDoc(docRef, {
      comments: arrayUnion(commentDetails),
    });

    setComment("");
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
        className="flex items-center justify-center"
      >
        <div className="relative w-full sm:w-[600px] h-full sm:h-[386px] bg-black text-white border border-gray-700 rounded-lg sm:p-10 p-4">
          <div
            className="absolute w-[2px] h-[77px] bg-gray-500 left-[40px] top-[96px] sm:left-[64px] 
            sm:top-[120px]"
          />
          <div
            className="absolute top-4 cursor-pointer"
            onClick={() => dispatch(closeCommentModal())}
          >
            <XMarkIcon className="w-6" />
          </div>
          <div className="mt-8">
            <div className="flex space-x-3">
              <img
                src={tweetDetails?.photoUrl}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex space-x-1.5">
                  <h1 className="font-bold">{tweetDetails?.name}</h1>
                  <h1 className="text-gray-500">@{tweetDetails?.username}</h1>
                </div>
                <p className="mt-1">{tweetDetails?.tweet}</p>
                <h1 className="text-gray-500 text-[15px] mt-2">
                  Replying to{" "}
                  <span className="text-[#1b9bf0]">
                    @{tweetDetails?.username}
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <div className="mt-11">
            <div className="flex space-x-3">
              <img
                src={user.photoUrl}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="w-full">
                <textarea
                  placeholder="Tweet your reply"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-transparent outline-none resize-none"
                />
                <div className="flex justify-between border-t border-gray-700 pt-4">
                  <div className="flex space-x-0">
                    <TweetInputIcon Icon={PhotoIcon} />
                    <TweetInputIcon Icon={ChartBarIcon} />
                    <TweetInputIcon Icon={FaceSmileIcon} />
                    <TweetInputIcon Icon={CalendarIcon} />
                    <TweetInputIcon Icon={MapPinIcon} />
                  </div>
                  <button
                    onClick={sendComment}
                    disabled={!comment}
                    className="bg-[#1d9bf0] rounded-full px-4 py-1.5 font-semibold hover:bg-blue-500 transition duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
