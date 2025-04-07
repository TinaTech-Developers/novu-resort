// "use server";
// import { redirect } from "next/dist/server/api-utils";
// import connectMongoDB from "../../../libs/mongodb";
// import Rooms from "../../../models/rooms";
// // import { redirect } from "next/navigation";

// export async function updateRoom(formData) {
//   try {
//     const id = formData.get("id");
//     const name = formData.get("name");
//     connectMongoDB();
//     await Rooms.findByIdAndUpdate({ _id: id }, { name }, { new: true });
//     redirect("/");
//   } catch (error) {
//     return { message: "failed to book a room" };
//   }
// }
