import { closeSignupModal, openSignupModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";

export default function SignupModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleSignUp() {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `./assets/profilePictures/pfp${Math.ceil(
        Math.random() * 8
      )}.jpg`,
    });

    router.reload();
  }

  async function handleGuestSignIn() {
    await signInWithEmailAndPassword(auth, "guest123@gmail.com", "Guest27@")
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      dispatch(
        setUser({
          username: currentUser.email.split("@")[0],
          name: currentUser.displayName,
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <button
        onClick={() => dispatch(openSignupModal())}
        className="bg-white text-black w-[160px]
        rounded-full h-[40px] font-medium hover:bg-[#cbd2d7]"
      >
        Sign Up
      </button>

      <Modal
        className="flex items-center justify-center"
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
      >
        <div
          className="w-[90%] h-[600px] bg-black text-white md:w-[560px] md:h-[600px] border border-gray-700 rounded-lg
          flex justify-center"
        >
          <div className="w-[90%] mt-8 flex flex-col">
            <button onClick={handleGuestSignIn} className="bg-white text-black w-full font-bold text-lg p-2 rounded">
              Sign in as guest
            </button>
            <h1 className="text-center mt-4 font-bold text-lg">or</h1>
            <h1 className="mt-4 font-bold text-4xl">Create your account</h1>
            <input
              type="text"
              className="mt-8 h-10 rounded-md bg-transparent border border-gray-700 p-6"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
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
              onClick={handleSignUp}
              className="bg-white text-black w-full font-bold text-lg p-2 rounded mt-8"
            >
              Create account
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
