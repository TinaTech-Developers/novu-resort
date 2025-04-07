import React from "react";

function Header() {
  return (
    <div className="">
      <div className="flex justify-between p-4 w-[95%] -mt-4 fixed bg-gray-200">
        <h1 className="font-semibold text-xl">Dashboard</h1>
        <h1>Welcome Back Admin</h1>
      </div>
      <hr className="bg-white mt-4" />
    </div>
  );
}

export default Header;
