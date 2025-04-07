"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Please enter valid credentials");
        return;
      }

      router.replace("dashboard/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 items-center justify-center w-96 h-auto py-10  shadow-2xl rounded-lg"
      >
        <h1 className="text-4xl font-semibold text-amber-950">Login</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-[90%] bg-amber-600 bg-opacity-20 p-2 outline-none text-center text-gray-700"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-[90%] bg-amber-600 bg-opacity-20 p-2 outline-none text-center text-gray-700"
        />
        <button
          href={"./dashboard/home"}
          className="w-[90%] bg-amber-600 p-2 text-center hover:text-white hover:bg-amber-900"
        >
          Login
        </button>
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
