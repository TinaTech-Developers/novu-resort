import React from "react";
import MiniHeader from "../components/MiniHeader";
import DashbordLayout from "../components/DashbordLayout";
import Header from "../components/Header";

function Settings() {
  return (
    <DashbordLayout>
      <main className=" bg-gray-200  min-h-screen w-full">
        <Header />
        <MiniHeader />
      </main>
    </DashbordLayout>
  );
}

export default Settings;
