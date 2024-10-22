"use client";

import { cabins } from "@/starter_data/data-cabins";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "@/app/_lib/supabase";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

// async function createBookings() {
//   // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
//   const { data: guestsIds } = await supabase
//     .from("guests")
//     .select("id")
//     .order("id");
//   const allGuestIds = guestsIds.map((cabin) => cabin.id);
//   const { data: cabinsIds } = await supabase
//     .from("cabins")
//     .select("id")
//     .order("id");
//   const allCabinIds = cabinsIds.map((cabin) => cabin.id);

//   const finalBookings = bookings.map((booking) => {
//     // Here relying on the order of cabins, as they don't have and ID yet
//     const cabin = cabins.at(booking.cabinId - 1);
//     const numNights = subtractDates(booking.endDate, booking.startDate);
//     const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
//     const extrasPrice = booking.hasBreakfast
//       ? numNights * 15 * booking.numGuests
//       : 0; // hardcoded breakfast price
//     const totalPrice = cabinPrice + extrasPrice;

//     let status;
//     if (
//       isPast(new Date(booking.endDate)) &&
//       !isToday(new Date(booking.endDate))
//     )
//       status = "checked-out";
//     if (
//       isFuture(new Date(booking.startDate)) ||
//       isToday(new Date(booking.startDate))
//     )
//       status = "unconfirmed";
//     if (
//       (isFuture(new Date(booking.endDate)) ||
//         isToday(new Date(booking.endDate))) &&
//       isPast(new Date(booking.startDate)) &&
//       !isToday(new Date(booking.startDate))
//     )
//       status = "checked-in";

//     return {
//       ...booking,
//       numNights,
//       cabinPrice,
//       extrasPrice,
//       totalPrice,
//       guestId: allGuestIds.at(booking.guestId - 1),
//       cabinId: allCabinIds.at(booking.cabinId - 1),
//       status,
//     };
//   });

//   console.log(finalBookings);

//   const { error } = await supabase.from("bookings").insert(finalBookings);
//   if (error) console.log(error.message);
// }

function Uploader() {
  return (
    <div className="flex flex-col gap-4">
      <h3>SAMPLE DATA</h3>

      <button className="bg-green-700 p-1 w-36" onClick={createCabins}>
        Upload cabins ONLY
      </button>
    </div>
  );
}

export default Uploader;
