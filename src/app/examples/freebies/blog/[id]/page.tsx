import Image from "next/image";
import Link from "next/link";
import defaultBlogPic from "@/assets/blog-default.jpg";

type BlogContentSection = {
  heading?: string;
  text: string;
};

type BlogContent = {
  title: string;
  author?: string;
  content: BlogContentSection[];
};

const mockBlogContent: BlogContent = {
  title: "5 Essential Mixing Tips for Clearer Vocals",
  author: "Sarah Smith",
  content: [
    {
      text: "In the world of music production, achieving crystal-clear vocals can make or break a track. Whether you're working on pop, hip-hop, or rock, the vocals are often the centerpiece of the song. Here are five essential mixing tips to help you achieve clearer, more professional-sounding vocals in your productions.",
    },
    {
      heading: "Start with a Good Recording",
      text: "The foundation of a great vocal mix is a good recording. Ensure you're using a quality microphone in a well-treated room. Pay attention to mic placement and gain staging during the recording process. Remember, it's always easier to mix a well-recorded vocal than to fix a poor recording in the mix.",
    },
    {
      heading: "Use Proper EQ Techniques",
      text: "Equalization is crucial for achieving clear vocals. Start by using a high-pass filter to remove unnecessary low frequencies, typically around 80-100 Hz. Then, identify and cut any resonant frequencies that may be muddying up the vocal. Boost the presence range (2-5 kHz) to help the vocals cut through the mix, but be careful not to overdo it.",
    },
    {
      heading: "Apply Compression Wisely",
      text: "Compression helps to even out the dynamics of a vocal performance, but it's easy to over-compress. Start with a ratio of 2:1 or 3:1 and adjust the threshold so you're getting 3-6 dB of gain reduction on the loudest parts. Use a slower attack time to preserve the transients and a release time that complements the rhythm of the vocal.",
    },
    {
      heading: "Utilize De-essing",
      text: "Sibilance (the harsh 'S' and 'T' sounds) can be distracting in a vocal recording. A de-esser plugin can help tame these frequencies. Be subtle with your de-essing; the goal is to reduce the harshness of sibilants without making the vocal sound lispy.",
    },
    {
      heading: "Add Space with Reverb and Delay",
      text: "Reverb and delay can add depth and dimension to your vocals. Use these effects sparingly to avoid washing out the vocal. Consider using a short room reverb to add a sense of space, and a subtle slap delay to add width. Always EQ your reverb returns to prevent them from cluttering the mix.",
    },
  ],
};

export default function BlogPost() {
  const content = mockBlogContent;

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{content.title}</h1>

          {content.author && (
            <p className="text-blue-600 hover:underline mb-4 inline-block">
              By {content.author}
            </p>
          )}

          <Image
            src={defaultBlogPic}
            alt="Vocal Mixing in a Studio"
            width={800}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg mb-6"
          />

          <div className="prose prose-lg">
            {content.content.map(
              (section: BlogContentSection, index: number) => (
                <div key={section.heading + "-" + index}>
                  {section.heading && (
                    <h2 className="text-xl font-semibold mb-2">
                      {section.heading}
                    </h2>
                  )}
                  <p>{section.text}</p>
                </div>
              ),
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
