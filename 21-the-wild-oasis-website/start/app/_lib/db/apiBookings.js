import supabase from "@/app/_lib/db/supabase";

export async function getBookings() {
  const { data, error, count } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select("*");
  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}
