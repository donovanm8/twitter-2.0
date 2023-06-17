import { CheckBadgeIcon } from "@heroicons/react/24/solid";

export default function TrendingUser({pfp, name, userName}) {
  return (
    <div className="flex justify-between p-3 hover:bg-white hover:bg-opacity-10">
      <div className="flex space-x-3">
        <img
          src={pfp}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div className="">
          <div className="flex space-x-1 ">
            <h1 className="font-bold hover:underline">{name}</h1>
            <CheckBadgeIcon className="w-[18px] text-blue-400" />
          </div>
          <h1 className="text-[12px] text-gray-400 mt-1 hover:underline">@{userName}</h1>
        </div>
      </div>
      <button className="bg-white text-black text-sm w-20 h-8 rounded-3xl font-semibold hover:bg-opacity-60">
        Follow
      </button>
    </div>
  );
}
