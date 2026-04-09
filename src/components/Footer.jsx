import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-300">
        <p>&copy; 2026 Pixel Création Studio</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/contact" className="hover:text-gray-100">Contact</Link>
          <Link href="#" className="hover:text-gray-100">LinkedIn</Link>
          <Link href="#" className="hover:text-gray-100">GitHub</Link>
        </div>
      </div>
    </footer>
  );
}