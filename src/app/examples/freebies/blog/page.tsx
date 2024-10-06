import Link from "next/link";
import Image from "next/image";
import NavBar from "../nav-bar";
import defaultBlogPic from "@/assets/blog-default.jpg";
import { prefix } from "../contants";
import Footer from "../footer";

const mockBlogPosts = [
  {
    id: 1,
    title: "10 Essential Mixing Techniques for Clearer Vocals",
    image: defaultBlogPic,
  },
  {
    id: 2,
    title: "The Ultimate Guide to Choosing the Right DAW",
    image: defaultBlogPic,
  },
  {
    id: 3,
    title: "How to Create Depth in Your Mix: A Step-by-Step Tutorial",
    image: defaultBlogPic,
  },
  {
    id: 4,
    title: "5 Game-Changing Plugins for Electronic Music Production",
    image: defaultBlogPic,
  },
  {
    id: 5,
    title: "Mastering on a Budget: Tools and Techniques",
    image: defaultBlogPic,
  },
  {
    id: 6,
    title: "The Art of Sampling: Legal and Creative Considerations",
    image: defaultBlogPic,
  },
];

export default function BlogPage() {
  const blogPosts = mockBlogPosts;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <NavBar />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="flex flex-col">
              <Link href={prefix + `/blog/${post.id}`} className="mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={300}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </Link>
              <Link
                href={`/blog/${post.id}`}
                className="text-xl font-semibold text-black hover:underline"
              >
                {post.title}
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
