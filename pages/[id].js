import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import { db } from "@/firebase";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import Moment from "react-moment";
import { useSelector } from "react-redux";

export default function CommentsPage({ tweetData }) {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div
        className={`bg-black text-white min-h-screen w-full max-w-[1400px] xl mx-auto relative flex ${
          !user.username && "blur-lg"
        }`}
      >
        <Sidebar user={user} />
        <div className="sm:ml-16 xl:ml-80 max-w-2xl flex-grow border-x border-gray-700">
          <div
            className="p-3 py-2 text-lg sm:text-xl font-bold bg-black sticky
      border-b border-gray-700 top-0 z-50 flex items-center space-x-2"
          >
            <Link href={"/"}>
              <ArrowLeftIcon className="w-7 cursor-pointer" />
            </Link>
            <h1>Tweet</h1>
          </div>
          <div className="border-b border-gray-700">
            <div className="flex space-x-3 p-3">
              <img
                className="w-11 h-11 rounded-full object-cover"
                src={tweetData?.photoUrl}
                alt=""
              />
              <div>
                <div className="flex items-center space-x-2 text-gray-500 mb-1">
                  <span className="font-bold text-white">
                    {tweetData?.name}
                  </span>
                  <span>@{tweetData?.username}</span>
                  <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  <Moment fromNow>{JSON.parse(tweetData?.timestamp)}</Moment>
                </div>
                <span className="text-base font-normal">{tweetData?.text}</span>
                {tweetData.image && (
                  <div>
                    <img
                      className="object-cover rounded-md mt-4 max-h-80 border border-gray-700 p-.5"
                      src={tweetData.image}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center p-2 border-b border-gray-700">
            <div className="flex items-center justify-center p-1 space-x-2">
              <img
                src={user.photoUrl}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="w-full">
                <textarea
                  placeholder="Tweet your reply"
                  className="text-white bg-transparent w-full outline-none resize-none"
                />
              </div>
            </div>
            <button
              className="bg-[#1d9bf0] rounded-full px-4 py-1.5 font-semibold
          hover:bg-blue-500 transition duration-500"
            >
              Reply
            </button>
          </div>
          {tweetData.comments?.map((comment) => {
            return (
              <div className="border-b border-gray-700">
                <div className="flex space-x-3 p-3">
                  <img
                    className="w-11 h-11 rounded-full object-cover"
                    src={comment?.photoUrl}
                    alt=""
                  />
                  <div>
                    <div className="flex items-center space-x-2 text-gray-500 mb-1">
                      <span className="font-bold text-white">
                        {comment?.name}
                      </span>
                      <span>@{comment?.username}</span>
                    </div>
                    <span className="text-base font-normal">
                      {comment?.comment}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Trending />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const id = context.query.id;

  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const formattedData = {
    username: data?.username || null,
    name: data?.name || null,
    photoUrl: data?.photoUrl || null,
    text: data?.tweet || null,
    comments: data?.comments || null,
    timestamp: JSON.stringify(data?.timestamp.toDate()) || null,
    image: data?.image || null,
  };

  return {
    props: {
      tweetData: formattedData,
    },
  };
}
