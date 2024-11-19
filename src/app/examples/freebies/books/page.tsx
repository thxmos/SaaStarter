import Link from "next/link";
import Image from "next/image";
import NavBar from "../nav-bar";
import { mockBooks, prefix } from "../contants";
import Footer from "../footer";
import defaultProductPic from "@/assets/product-default.svg";

export default function BooksPage() {
  const books = mockBooks;

  const title = "Free Music Production Books";
  const description = "";

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <NavBar />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-2 text-center text-black">
          {title}
        </h1>
        <h2 className="text-xl mb-12 text-center text-gray-600">
          {description}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex flex-col items-center text-center"
            >
              <Link href={prefix + `/products/${book.id}`} className="mb-4">
                <Image
                  src={book?.image ?? defaultProductPic}
                  alt={book.title}
                  width={243}
                  height={243}
                  className="w-full h-auto aspect-square object-cover"
                />
              </Link>
              <Link href={prefix + `/products/${book.id}`} className="mb-2">
                <h2 className="text-xl font-semibold underline text-black">
                  {book.title}
                </h2>
              </Link>
              <p className="text-gray-600">{book.description}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
