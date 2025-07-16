import React from "react";
import ResApprovalForm from "../../components/ResApprovalForm";
const getResById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/reservations/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new error("Failed to approve order");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

async function OrderDetails({ params }) {
  const { id } = params;
  const { reservations } = await getResById(id);

  let { surname, email, period, message, total, deptdate, arrivaldate } =
    reservations;

  return (
    <>
      <ResApprovalForm
        id={id}
        surname={surname}
        email={email}
        period={period}
        message={message}
        total={total}
        arrivaldate={arrivaldate}
        deptdate={deptdate}
      />
    </>
  );
}

export default OrderDetails;
