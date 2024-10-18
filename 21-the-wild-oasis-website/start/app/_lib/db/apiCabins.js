import supabase from "@/app/_lib/db/supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase
    .from("cabins")
    .select("id,name,maxCapacity,regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return cabins;
}
