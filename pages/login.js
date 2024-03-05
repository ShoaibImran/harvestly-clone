"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";
import logo from "../assets/logo.png";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function signin() {
  const router = useRouter();
  const error = () => toast.error("Email or Password is incorrect!");
  const signingIn = () => toast.success("Logging in...");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result.error) {
        error();
        console.error("Authentication failed:", result.error);
      } else {
        signingIn();
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-primary flex flex-col lg:flex-row  h-full lg:h-screen p-3 font-montserrat">
        <div className=" w-full lg:w-1/2 bg-grey-lighter flex rounded flex-col order-2 lg:order-1 bg-white">
          <div className="container w-full lg:w-4/6 mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded text-black w-full">
              <h1 className="mb-8 text-3xl text-center font-semibold">
                Welcome Back 👋
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex my-5 bg-gray-200 rounded-md p-3 items-center space-x-2">
                  <input
                    type="email"
                    id="name"
                    className="outline-none bg-transparent"
                    name="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                <div className="flex my-5 bg-gray-200 rounded-md p-3 items-center space-x-2">
                  <input
                    type="password"
                    id="password"
                    className="outline-none w-full bg-transparent"
                    name="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <button
                  type="submit"
                  className="w-full font-medium flex justify-between p-3 items-center  bg-primary text-center py-3 rounded bg-green text-white hover:bg-primary-600 focus:outline-none my-1"
                >
                  <h2>Log In</h2>
                </button>
              </form>
              <div className=" my-4 flex w-full justify-between">
                <h2>Don't have account?</h2>
                <div className="flex gap-4">
                  <Link
                    href="/farmersignup"
                    className="flex  font-medium text-blue-700 items-center space-x-2"
                  >
                    <h2>Farmer Sign Up</h2>
                  </Link>
                  <Link
                    href="/usersignup"
                    className="flex font-medium text-blue-700 items-center space-x-2"
                  >
                    <h2>User Sign Up</h2>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full lg:w-1/2 order-1 flex items-center lg:order-2 justify-center">
          <Image
            src={logo}
            className="w-48 my-5 lg:w-80 bg-white rounded-full"
            alt="logo"
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default signin;
