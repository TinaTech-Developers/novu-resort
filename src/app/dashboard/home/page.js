import React from "react";
import BarChart from "../components/BarChart";
import DashbordLayout from "../components/DashbordLayout";
import Header from "../components/Header";
import RecentOrders from "../components/RecentOrders";
import TopCards from "../components/TopCards";

function Home() {
  return (
    <DashbordLayout>
      <main className=" bg-gray-200  min-h-screen w-full">
        <Header />
        <TopCards />
        <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <BarChart />
          <RecentOrders />
        </div>
      </main>
    </DashbordLayout>
  );
}

export default Home;
