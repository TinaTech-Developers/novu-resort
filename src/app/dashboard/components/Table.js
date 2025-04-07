import React from "react";

function Table({ id, date, description, budget, amount, vat }) {
  return (
    <>
      <tr key={id} className="grid grid-cols-1 md:grid-cols-12">
        <td className="col-span-2 text-center border border-black border-r-[1px] border-t-0  text-sm">
          {date}
        </td>
        <td className="col-span-6 text-center border border-black border-r-[1px] border-t-0  text-sm">
          {description}
        </td>
        <td className="col-span-2 text-center border border-black border-r-[1px] border-t-0  text-sm">
          US${budget}.00
        </td>
        <td className="col-span-1 text-center border border-black border-r-[1px] border-t-0  text-sm">
          US${amount}.00
        </td>
        <td className="col-span-1 text-center border border-black border-r-[1px] border-t-0  text-sm">
          US${vat}.00
        </td>
      </tr>
    </>
  );
}

export default Table;
