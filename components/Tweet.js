import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  ChartBarIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import TweetHeader from "./ui/TweetHeader";
import { useDispatch } from "react-redux";
import { openCommentModal, setCommentTweet } from "@/redux/modalSlice";

export default function Tweet({ data, id }) {
  const dispatch = useDispatch();

  return (
    <div className="border-b border-gray-700">
      <TweetHeader
        username={data?.username}
        name={data?.name}
        timestamp={data?.timestamp?.toDate()}
        text={data?.tweet}
        photoUrl={data?.photoUrl}
      />

      <div className="p-3 ml-14 flex space-x-14 text-gray-500">
        <div
          onClick={() => {
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
        </div>
        <HeartIcon className="w-5 cursor-pointer hover:text-pink-500" />
        <ChartBarIcon className="w-5 cursor-not-allowed hover:text-blue-500" />
        <ArrowUpTrayIcon className="w-5 cursor-not-allowed hover:text-blue-500" />
      </div>
    </div>
  );
}
