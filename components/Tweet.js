import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeart } from "@heroicons/react/24/solid";
import TweetHeader from "./ui/TweetHeader";
import { useDispatch, useSelector } from "react-redux";
import { openCommentModal, openLoginModal, setCommentTweet } from "@/redux/modalSlice";
import { useRouter } from "next/router";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";

export default function Tweet({ data, id }) {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  async function likeTweet(event) {
    event.stopPropagation();
    if (!user.username) {
      dispatch(openLoginModal())
      return 
    }

    if (likes.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayUnion(user.uid),
      });
    }
  }

  async function deleteTweet(event) {
    event.stopPropagation()

    await deleteDoc(doc(db, "posts", id))
  }

  useEffect(() => {
    if (!id) return;

    const unsubsribe = onSnapshot(doc(db, "posts", id), (doc) => {
      setLikes(doc.data()?.likes);
      setComments(doc.data()?.comments);
    });

    return unsubsribe;
  }, []);

  return (
    <div
      onClick={() => router.push("/" + id)}
      className="border-b border-gray-700 cursor-pointer"
    >
      <TweetHeader
        username={data?.username}
        name={data?.name}
        timestamp={data?.timestamp?.toDate()}
        text={data?.tweet}
        photoUrl={data?.photoUrl}
        image={data?.image}
      />

      <div className="p-3 ml-14 flex space-x-14 text-gray-500">
        <div
        className="flex items-center justify-center space-x-2 relative"
          onClick={(event) => {
            event.stopPropagation();
            if (!user.username) {
              dispatch(openLoginModal())
              return 
            }
            dispatch(
              setCommentTweet({
                id: id,
                tweet: data?.tweet,
                photoUrl: data?.photoUrl,
                username: data?.username,
                name: data?.name,
              })
            );
            dispatch(openCommentModal());
          }}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="w-5 cursor-pointer hover:text-green-500" />
          {comments?.length > 0 && <span className="absolute -right-4 -bottom-.5">{comments?.length}</span>}
        </div>
        <div onClick={likeTweet} className="flex items-center justify-center space-x-2 relative">
          {likes.includes(user.uid) ? (
            <FilledHeart className="w-5 text-pink-500" />
          ) : (
            <HeartIcon className="w-5 cursor-pointer hover:text-pink-500" />
          )}
          {likes.length > 0 && <span className="absolute -right-6 -bottom-[1px]">{likes.length}</span>}
        </div>
        {user.uid === data?.uid && <div onClick={deleteTweet}><TrashIcon className="w-5 cursor-pointer hover:text-red-600"/></div>}
        <ChartBarIcon className="w-5 cursor-not-allowed hover:text-blue-500" />
        <ArrowUpTrayIcon className="w-5 cursor-not-allowed hover:text-blue-500" />
      </div>
    </div>
  );
}
