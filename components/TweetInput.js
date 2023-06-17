import {
  PhotoIcon,
  ChartBarIcon,
  FaceSmileIcon,
  CalendarIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import TweetInputIcon from "./ui/TweetInputIcon";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { openLoginModal } from "@/redux/modalSlice";

export default function TweetInput() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)

  const user = useSelector((state) => state.user);
  const filePickerRef = useRef(null);
  const dispatch = useDispatch()

  async function sendTweet() {
    if (!user.username) {
      dispatch(openLoginModal())
      setText("")
      setImage(null)
      return
    }

    setLoading(true)
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      uid: user.uid,
      tweet: text,
      timestamp: serverTimestamp(),
      likes: [],
    });

    if (image) {
      const imageRef = ref(storage, `tweetImages/${docRef.id}`);
      const uploadImage = await uploadString(imageRef, image, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
    }

    setText("");
    setImage(null)
    setLoading(false)
  }

  function addImageToTweet(event) {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.addEventListener("load", (event) => {
      setImage(event.target.result);
    });
  }

  return (
    <div className="p-3 flex space-x-3 border-b border-gray-700">
      <img
        src={user.photoUrl || `/assets/egg.jpg`}
        className="w-11 h-11 rounded-full object-cover"
        alt=""
      />
      {loading && <span className="font-bold text-xl">Uploading your tweeter...</span>}
      {!loading && (<div className="w-full">
        <textarea
          placeholder="What's on your mind today?"
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="bg-transparent outline-none resize-none w-full min-h-[50px]"
        />
        {image && (
          <div className="mb-4 relative">
            <div
              onClick={() => setImage(null)}
              className="absolute left-2 top-2 cursor-pointer bg-[#272c26] rounded-full w-8 h-8 flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition-all"
            >
              <XMarkIcon className="w-5" />
            </div>
            <img className="rounded-2xl max-h-48 object-contain" src={image} />
          </div>
        )}

        <div className="flex justify-between border-t border-gray-700 pt-4">
          <div className="flex space-x-0">
            <div onClick={() => filePickerRef.current.click()}>
              <TweetInputIcon Icon={PhotoIcon} />
            </div>
            <input
              onChange={addImageToTweet}
              ref={filePickerRef}
              type="file"
              className="hidden"
            />
            <TweetInputIcon Icon={ChartBarIcon} />
            <TweetInputIcon Icon={FaceSmileIcon} />
            <TweetInputIcon Icon={CalendarIcon} />
            <TweetInputIcon Icon={MapPinIcon} />
          </div>
          <button
            className="bg-[#1d9bf0] rounded-full px-4 py-1.5 font-semibold
          hover:bg-blue-500 transition duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={sendTweet}
            disabled={!text && !image}
          >
            Tweet
          </button>
        </div>
      </div>)}
    </div>
  );
}
