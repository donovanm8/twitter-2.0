import BottomBanner from "@/components/BottomBanner";
import PostFeed from "@/components/Postfeed";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import CommentModal from "@/components/modals/CommentModal";
import { useSelector } from "react-redux";

export default function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div>
      <div className="bg-black text-white min-h-screen w-full max-w-[1400px] xl mx-auto relative flex">
        <Sidebar />
        <PostFeed />
        <Trending />
      </div>
      <CommentModal />
      {!username && <BottomBanner />}
    </div>
  );
}
