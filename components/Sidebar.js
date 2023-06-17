import Image from "next/image";
import SiderbarLink from "./ui/SidebarLink";
import {
  MagnifyingGlassIcon,
  HomeIcon,
  BellIcon,
  EnvelopeIcon,
  ClipboardIcon,
  BookmarkIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "@/redux/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { closeLoginModal, closeSignupModal } from "@/redux/modalSlice";

export default function Sidebar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function handleSignOut() {
    await signOut(auth)
    dispatch(signOutUser())
    dispatch(closeLoginModal())
    dispatch(closeSignupModal())
  }
  return (
    <div className="hidden sm:flex flex-col fixed h-full xl:ml-24">
      <nav className="relative h-full xl:space-y-1.5 ml-2 xl:ml-0">
        <div className="flex pl-1.5 justify-start py-3 xl:p-3">
          <Image
            src={
              "https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/twitter-icon-18-256.png"
            }
            className=""
            width={40}
            height={40}
          />
        </div>
        <SiderbarLink text="Home" Icon={HomeIcon} />
        <SiderbarLink text="Explore" Icon={MagnifyingGlassIcon} />
        <SiderbarLink text="Notifications" Icon={BellIcon} />
        <SiderbarLink text="Messages" Icon={EnvelopeIcon} />
        <SiderbarLink text="Lists" Icon={ClipboardIcon} />
        <SiderbarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SiderbarLink text="Verified" Icon={CheckBadgeIcon} />
        <SiderbarLink text="Profile" Icon={UserGroupIcon} />
        <SiderbarLink text="More" Icon={EllipsisHorizontalCircleIcon} />
        <button
          className="hidden xl:inline bg-[#1d9bf0] rounded-full w-[200px] h-[52px] text-lg font-bold mt-2
        hover:bg-blue-500 transition duration-300"
        >
          Tweet
        </button>
      </nav>
      <div
      onClick={handleSignOut}
        className="hover:bg-white hover:bg-opacity-20 rounded-full absolute bottom-2 -right-2 flex items-center xl:w-full xl:justify-start
      space-x-3 w-14 h-14 justify-center cursor-pointer xl:pl-1"
      >
        <img
          src={user.photoUrl || `./assets/egg.jpg`}
          className="w-10 h-10 object-cover rounded-full"
        />
        <div className="relative hidden xl:inline">
          <h1 className="font-bold whitespace-nowrap">{user.name}</h1>
          <h1 className="text-gray-500">@{user.username}</h1>
        </div>
        <EllipsisHorizontalIcon className="hidden xl:inline absolute right-0 w-7" />
      </div>
    </div>
  );
}
