import React, { useState } from "react";
import imgfront from "../assets/all.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../services/authentication";

const schema = yup.object({
  email: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    login(data)
      .then((response) => {
        if (response.name === "AxiosError") {
          throw new Error(response.response.data.msg);
        }
        const logObj = {
          id: response.user.id,
          token: response.accessToken,
          name: response.user.name,
        };
        if (logObj.name.split(" ")[0] !== "admin") {
          throw new Error("Login as Admin!");
        }
        localStorage.setItem("AccessTokenForAdmin", response.accessToken);
        localStorage.setItem("admin-details", JSON.stringify(logObj));
        navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen w-full overflow-hidden">
      <section className="bg-gradient-to-bl from-violet-50 to-violet-400 flex-1">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-6 py-8 mx-auto overflow-y-auto md:min-h-screen md:py-0">
          <a
            href="/landing"
            className="flex items-center mb-6 text-3xl md:text-6xl text-violet-950 font-caveat font-bold gap-x-6"
          >
            <img
              className="w-20 h-20 mr-2"
              src="https://www.legitgambling.com/images/icons/dfs.svg"
              alt="logo"
            />
            Fantasy 11
          </a>
          <div className="w-full bg-gradient-to-tr from-blue-200 to-purple-200 text-huckleberry-700 font-bold py-2 px-4 rounded-lg shadow border border-violet-950 max-w-md">
            <div className="p-6 space-y-4 md:space-y-6">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-violet-950 md:text-2xl">
                Log in to your account
              </h1>
              {errorMsg ? (
                <p className="text-center text-sm text-red-500 font-semibold">
                  {errorMsg}
                </p>
              ) : (
                <></>
              )}
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-violet-950"
                  >
                    Your email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-violet-50 border border-violet-300 text-violet-950 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 placeholder-violet-400 "
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-violet-950"
                  >
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-violet-50 border border-violet-300 text-violet-950 sm:text-sm rounded-lg focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 placeholder-violet-400 "
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-violet-300 rounded bg-violet-50 focus:ring-3 focus:ring-violet-300"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-violet-500">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-violet-600 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-tr from-pink-500 to-orange-500 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 w-full md:w-auto md:px-10 md:py-3.5 focus:ring-4 focus:outline-none focus:ring-violet-300"
                  >
                    Sign in
                  </button>
                </div>
                <p className="text-sm font-light text-violet-500">
                  Don’t have an account yet?{" "}
                  <Link
                    to={"/register"}
                    className="font-medium text-violet-600 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <div className="hidden md:block w-full md:w-[50%] lg:flex">
        <img
          src={imgfront}
          alt="Versus"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
