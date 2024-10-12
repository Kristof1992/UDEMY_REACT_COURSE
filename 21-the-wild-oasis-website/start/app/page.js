import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>The Wild Oasis. Welcome to paradise.</h1>

      {/* Instead of <a> we use the <Link> component
        * in order to have the Single App feel.
        * More optimized behind the scenes.
        *
      <a href="/cabins">Explore luxury cabins</a> */}
      <Link href="/cabins">Explore luxury cabins</Link>
    </div>
  );
}
