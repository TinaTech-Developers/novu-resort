import React from "react";
import OrderApprovalForm from "../../components/OrderApprovalForm";

const getOrderById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
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

async function OrderDetailz({ params }) {
  const { id } = params;
  const { orders } = await getOrderById(id);

  const { fullname, email, period, newName, payment, newPrice } = orders;
  return (
    <>
      <OrderApprovalForm
        id={id}
        fullname={fullname}
        email={email}
        period={period}
        newName={newName}
        payment={payment}
        newPrice={newPrice}
      />
    </>
  );
}

export default OrderDetailz;
