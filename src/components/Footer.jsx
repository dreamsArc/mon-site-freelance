import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-300">
        <p>&copy; 2025 Développeur Freelance</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/contact" className="hover:text-white">Contact</Link>
          <Link href="#" className="hover:text-white">LinkedIn</Link>
          <Link href="#" className="hover:text-white">GitHub</Link>
        </div>
      </div>
    </footer>
  );
}