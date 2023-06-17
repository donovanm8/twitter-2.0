import {
  PhotoIcon,
  ChartBarIcon,
  FaceSmileIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import TweetInputIcon from "./ui/TweetInputIcon";
import { useSelector } from "react-redux";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

export default function TweetInput() {
  const [text, setText] = useState("")

  const user = useSelector((state) => state.user);

  async function sendTweet() {
    const docRef = await addDoc(collection(db, "posts"), {
      username : user.username,
      name: user.name,
      photoUrl : user.photoUrl,
      uid : user.uid,
      tweet : text,
      timestamp : serverTimestamp(),
      likes : [],
    })

    setText("")
  }

  return (
    <div className="p-3 flex space-x-3 border-b border-gray-700">
      <img
        src={user.photoUrl || `/assets/egg.jpg`}
        className="w-11 h-11 rounded-full object-cover"
        alt=""
      />
      <div className="w-full">
        <textarea
          placeholder="What's on your mind today?"
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="bg-transparent outline-none resize-none w-full min-h-[50px]"
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
            className="bg-[#1d9bf0] rounded-full px-4 py-1.5 font-semibold
          hover:bg-blue-500 transition duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={sendTweet}
          disabled={!text}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
