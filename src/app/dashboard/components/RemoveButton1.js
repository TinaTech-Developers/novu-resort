"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { MdOutlineDeleteForever } from "react-icons/md";

function RemoveButton({ id }) {
  const router = useRouter();
  const removeReservation = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/orders?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <button onClick={removeReservation}>
      <MdOutlineDeleteForever size={"1.6rem"} color="red" />
    </button>
  );
}

export default RemoveButton;
