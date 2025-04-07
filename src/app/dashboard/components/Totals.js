import React from "react";

function Totals({ budgety, amounty }) {
  return (
    <tr className="grid grid-cols-1 md:grid-cols-12 bg-green-600 font-semibold">
      <td className="col-span-2 text-center border border-black border-r-[1px] border-t-0  text-sm"></td>
      <td className="col-span-6 text-center border border-black border-r-[1px] border-t-0  text-sm"></td>
      <td className="col-span-2 text-center border border-black border-r-[1px] border-t-0  text-sm">
        US${budgety}
      </td>
      <td className="col-span-1 text-center border border-black border-r-[1px] border-t-0  text-sm">
        US${amounty}
      </td>
      <td className="col-span-1 text-center border border-black border-r-[1px] border-t-0  text-sm">
        US${budgety - amounty}
      </td>
    </tr>
  );
}

export default Totals;
