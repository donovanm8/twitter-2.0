import {
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import TrendingTopic from "./ui/TrendingTopic";
import TrendingUser from "./ui/TrendingUser";
export default function Trending() {
  return (
    <div className="hidden lg:flex flex-col ml-8 mt-4">
      <div className="flex space-x-3 bg-white bg-opacity-10 w-[300px] h-[44px] p-3 rounded-3xl">
        <MagnifyingGlassIcon className="w-6 text-gray-600" />
        <input
          placeholder="Search Twitter"
          className="bg-transparent outline-none placeholder:text-gray-600"
        />
      </div>

      <div className="w-[300px] h-[500px] bg-white bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold p-3 text-xl">What's happening</h1>
        <TrendingTopic
          country={"US"}
          topic={"Jeffrey Epstein"}
          tweetCount={96}
        />
        <TrendingTopic country={"MX"} topic={"El Chapo"} tweetCount={101} />
        <TrendingTopic
          country={"UK"}
          topic={"Premier League Sunday"}
          tweetCount={22}
        />
        <TrendingTopic country={"AU"} topic={"Sydney"} tweetCount={47} />
        <TrendingTopic country={"FR"} topic={"Macron"} tweetCount={310} />
      </div>

      <div className="w-[300px] h-[300px] bg-white bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold p-3 text-xl">Who to Follow</h1>
        <TrendingUser
          pfp={
            "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"
          }
          name={"Elon Musk"}
          userName={"elonmusk"}
        />
        <TrendingUser
          pfp={
            "https://yt3.googleusercontent.com/ilXDOhnI33_OR9SWcOmUDfsyjcUH1Ssj7Llif1RZ4RXvQ5K0rRp9PP-oofC1rRqgHU_jfMDgiEA=s900-c-k-c0x00ffffff-no-rj"
          }
          name={"David Bragg"}
          userName={"br4gg"}
        />
        <div className="flex justify-between p-3 hover:bg-white hover:bg-opacity-10">
          <div className="flex space-x-3">
            <img
              src={
                "https://pbs.twimg.com/profile_images/1587352380454338561/Uav_0HHn_400x400.jpg"
              }
              className="w-11 h-11 rounded object-cover"
              alt=""
            />
            <div>
              <div className="flex space-x-1">
                <h1 className="font-bold hover:underline">Amazon</h1>
                <CheckBadgeIcon className="w-[18px] text-yellow-400" />
              </div>
              <h1 className="text-[12px] text-gray-400 mt-1 hover:underline">@Amazon</h1>
            </div>
          </div>
          <button className="bg-white text-black text-sm w-20 h-8 rounded-3xl font-semibold hover:bg-opacity-60">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
