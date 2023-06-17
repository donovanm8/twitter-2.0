import { auth } from "@/firebase";
import { closeLoginModal, openLoginModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  async function handleSignin() {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function handleGuestSignIn() {
    await signInWithEmailAndPassword(auth, "guest123@gmail.com", "Guest27@")
  }
  return (
    <>
      <button
        onClick={() => dispatch(openLoginModal())}
        className="bg-transparent border border-white text-white w-[160px]
        rounded-full h-[40px] font-medium hover:bg-[#cbd2d7]"
      >
        Log In
      </button>

      <Modal
        className="flex items-center justify-center"
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
      >
        <div
          className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[600px] border border-gray-700 rounded-lg
          flex justify-center"
        >
          <div className="w-[90%] mt-8 flex flex-col">
            <h1 className="mt-4 font-bold text-4xl">Sign in to your account</h1>
            <input
              type="email"
              className="mt-8 h-10 rounded-md bg-transparent border border-gray-700 p-6"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="mt-8 h-10 rounded-md bg-transparent border border-gray-700 p-6"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSignin}
              className="bg-white text-black w-full font-bold text-lg p-2 rounded mt-8"
            >
              Sign In
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <button onClick={handleGuestSignIn} className="bg-white text-black w-full font-bold text-lg p-2 rounded mt-4">
              Sign in as guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
