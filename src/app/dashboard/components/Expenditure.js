"use client";
import FillButton from "@/components/FillButton";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Table from "./Table";
import Totals from "./Totals";

function Expenditure() {
  const API_BASE_URL =
    process.env.API_BASE_URL ||
    "http://localhost:3000" ||
    "www.cfknyaresort.co.zw";

  const [modalOpen, setModalOpen] = useState(false);
  const [expenditure, setExpenditure] = useState([]);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState();
  const [amount, setAmount] = useState();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleExpenditure = async (e) => {
    e.preventDefault();
    if (!date || !description || !budget || !amount) {
      alert("Fill all fields");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/expenditure`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          date,
          description,
          budget,
          amount,
        }),
      });
      if (res.ok) {
        toast.success("New Expenditure Successfully added....");
        reset();

        router.refresh("/dashboard/settings");

        //setModalOpen(false);
      }
    } catch (error) {
      toast.error("unable to post");
    }
  };

  const reset = () => {
    setDate("");
    setDescription("");
    setBudget("");
    setAmount("");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/expenditure");
        const data = await response.json();

        // Assuming data.expenditure is the correct structure
        if (Array.isArray(data.expenditure)) {
          setExpenditure(data.expenditure);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // Safeguard against expenditure being undefined or not an array
  const budgety = (Array.isArray(expenditure) ? expenditure : []).reduce(
    (acc, current) => acc + (current.budget || 0),
    0
  );

  const amounty = (Array.isArray(expenditure) ? expenditure : []).reduce(
    (acc, current) => acc + (current.amount || 0),
    0
  );

  const vat = (Array.isArray(expenditure) ? expenditure : []).reduce(
    (acc, current) => acc + (current.vat || 0),
    0
  );
  return (
    <div className="p-5 w-full">
      <div className="flex-wrap md:flex items-center justify-between   ">
        <h1 className="font-semibold mb-4">Expenditure</h1>
        <FillButton
          name={"Add Expenditure"}
          link={""}
          onClick={() => setModalOpen(true)}
        />
      </div>
      <table className="">
        <tr className="grid grid-cols-1 md:grid-cols-12 font-semibold bg-amber-600 text-sm  border border-black">
          <th className="col-span-2 border-r-[1px] border-black text-center capitalize">
            Date
          </th>
          <th className="col-span-6 border-r-[1px] border-black text-center capitalize">
            description of Expensises
          </th>
          <th className="col-span-2 border-r-[1px] border-black text-center capitalize">
            Budget
          </th>
          <th className="col-span-1 border-r-[1px] border-black text-center capitalize">
            Actual Amount
          </th>
          <th className="col-span-1 text-center capitalize">Var</th>
        </tr>
        {expenditure.map((exp) => (
          <Table
            key={exp._id}
            id={exp._id}
            date={exp.date}
            description={exp.description}
            budget={exp.budget}
            amount={exp.amount}
            vat={exp.budget - exp.amount}
          />
        ))}
        <Totals budgety={budgety} amounty={amounty} />
      </table>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form>
          <div className="w-full gap-2 mb-4">
            <div className="fex flex-wrap md:grid md:grid-cols-2 gap-2">
              <div className="col-span-1 py-1">
                <label className="font-semibold">
                  Date<span className="text-red-700">*</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="col-span-1 py-1">
                <label className="font-semibold">
                  Budget<span className="text-red-700">*</span>
                </label>
                <input
                  placeholder="$60.00"
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div className="fex flex-wrap md:grid md:grid-cols-2 gap-2">
              <div className="col-span-1 py-1">
                <label className="font-semibold">
                  Actual Amount<span className="text-red-700">*</span>
                </label>
                <input
                  placeholder="$50.00"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              {/* <div className="col-span-1 py-1">
                <label className="font-semibold">
                  Vat<span className="text-red-700">*</span>
                </label>
                <input
                  placeholder="15%"
                  type="text"
                  // value={country}
                  // onChange={(e) => setCountry(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div> */}
            </div>
            <div className="col-span-2 gap-2">
              <label className="font-semibold mb-2">
                Description<span className="text-red-700">*</span>
              </label>
              <textarea
                rows={8}
                className="col-span-2 w-full input input-bordered h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            onClick={handleExpenditure}
            className="p-2 text-white bg-orange-600 rounded-lg"
          >
            Submit
          </button>
          <ToastContainer />
        </form>
      </Modal>
    </div>
  );
}

export default Expenditure;
