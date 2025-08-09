import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold">Custom Board Game Maker</h1>
      <p className="mt-4">
        Create your own themed board game in minutes!
      </p>
      <Link href="/customize">
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded">
          Start Creating
        </button>
      </Link>
    </div>
  );
}
