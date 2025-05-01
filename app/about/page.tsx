import React from "react";
import AboutSection from "@/components/about-section";
// Remove this import since Navbar is now in layout.tsx
// import { Navbar } from '@/components/Navbar'
import Image from "next/image";

const page = () => {
  return (
    <>
      <div className="w-screen flex flex-col">
        {/* Remove this navbar reference */}
        {/* <Navbar></Navbar> */}
        <section className="relative h-[60vh] overflow-hidden">
          <Image
            src="/bg-2.jpg?height=1080&width=1920"
            alt="School campus"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to KMGSS
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl">
              Nurturing Minds, Inspiring Futures
            </p>
          </div>
        </section>
        <AboutSection></AboutSection>
      </div>
    </>
  );
};

export default page;
