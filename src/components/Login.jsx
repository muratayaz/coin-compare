import React from "react";

const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  emailError,
  passwordError,
}) => {
  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center  bg-gray-900 p-14 m-auto">
        <label className="text-white my-3 block text-xl">Email</label>
        <input
          className="w-48 md:w-72 border-none outline-none text-xl p-2"
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-red-600">{emailError}</p>
        <label className="text-white my-3 block text-xl">Şifre</label>
        <input
          className="w-48 md:w-72 border-none outline-none text-xl p-2"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-600">{passwordError}</p>
        <div className="py-6">
          <button
            className=" bg-white py-2 w-24 md:w-36 "
            onClick={handleLogin}
          >
            Giriş Yap
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
