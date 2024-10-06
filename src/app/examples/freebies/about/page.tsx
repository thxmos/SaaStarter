import { COMPANY_NAME } from "@/constants";
import Image from "next/image";
import defaultProductPic from "@/assets/product-default.svg";

export default function AboutPage() {
  const content = [
    "DJ Soundscape, born Mark Thompson, discovered his passion for music at an early age. Growing up in a small town in the Midwest, he was always fascinated by the way different sounds could come together to create something beautiful. His journey into music production began in his teenage years when he started experimenting with his father's old turntables and a basic digital audio workstation. What started as a hobby quickly turned into an obsession, and Mark found himself spending countless hours perfecting his craft.",
    "In 2010, Mark moved to Los Angeles to pursue his dream of becoming a professional music producer. He adopted the moniker DJ Soundscape and began playing small gigs at local clubs. His unique blend of electronic and organic sounds caught the attention of several up-and-coming artists, leading to his first major collaboration in 2013. Since then, DJ Soundscape has worked with numerous chart-topping artists, produced multiple platinum records, and even scored a few independent films. Despite his success, he remains committed to pushing the boundaries of sound and helping aspiring producers find their own unique voice in the industry.",
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 py-12">
      <div className="max-w-2xl mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          <Image
            src={defaultProductPic}
            alt={COMPANY_NAME}
            width={400}
            height={400}
            className="rounded-lg shadow-lg w-full max-w-md"
          />
          <div className="space-y-6">
            {content.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
