import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full max-w-md bg-white text-black p-4 rounded-lg mx-auto mt-10">
      Please access the following pages:
      <Link href="/admin" className="block underline">Admin Page</Link>
    </div>
  );
}
