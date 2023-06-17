import Moment from "react-moment";
export default function TweetHeader({
  username,
  name,
  text,
  timestamp,
  photoUrl,
}) {
  return (
    <div className="flex space-x-3 p-3">
      <img
        className="w-11 h-11 rounded-full object-cover"
        src={photoUrl}
        alt=""
      />
      <div>
        <div className="flex items-center space-x-2 text-gray-500 mb-1">
          <span className="font-bold text-white">{name}</span>
          <span>@{username}</span>
          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
          <Moment fromNow>{timestamp}</Moment>
        </div>
        <span className="text-base font-normal">{text}</span>
      </div>
    </div>
  );
}
