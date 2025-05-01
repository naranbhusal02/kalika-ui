"use client";

import { HeroSection } from "@/components/hero-section";
import FacilitiesCarousel from "@/components/FacilitiesCarousel";
import CourseCards from "@/components/course-cards";
import KalikaChatbot from "@/components/Chatbot";
// Remove Navbar import since it's now in layout.tsx
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen overflow-x-hidden flex-col">
      {/* Remove Navbar from here */}
      <HeroSection />
      <div className="min-h-screen mt-10 ">
        <FacilitiesCarousel />
      </div>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-50 flex items-center justify-center py-10 px-6">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ height: "600px" }}
        >
          {/* Video Section */}
          <div className="flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-full aspect-w-16 aspect-h-9 lg:p-6">
              <iframe
                className="rounded-lg shadow-lg"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/Nsm51MO9d-o?si=S87Fc1YsQ9kbeO7B"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center px-8 lg:px-14 py-10">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Welcome to Our School!
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Discover what makes our school exceptional. From our top-notch
              facilities to our dedicated faculty, we ensure a holistic learning
              environment for all our students. Watch the video to learn more!
            </p>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-700 text-lg">
                <span className="w-7 h-7 flex items-center justify-center bg-[#1457d8] text-white rounded-full mr-4 font-bold">
                  ✓
                </span>
                State-of-the-art facilities and classrooms.
              </li>
              <li className="flex items-center text-gray-700 text-lg">
                <span className="w-7 h-7 flex items-center justify-center bg-[#1457d8] text-white rounded-full mr-4 font-bold">
                  ✓
                </span>
                Experienced and dedicated teaching staff.
              </li>
              <li className="flex items-center text-gray-700 text-lg">
                <span className="w-7 h-7 flex items-center justify-center bg-[#1457d8] text-white rounded-full mr-4 font-bold">
                  ✓
                </span>
                A focus on both academics and extracurricular activities.
              </li>
            </ul>
            <a
              href="/about"
              className="mt-8 inline-block bg-[#1457d8] hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-md transition duration-200"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
      <section className="w-10/12 mx-auto px-4 py-12 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-medium">About us</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a2e]">
                Our Educational Journey
              </h2>
              <p className="text-muted-foreground text-lg">
                Founded with a commitment to excellence in education, KMGSS has
                been nurturing young minds and shaping future leaders with a
                blend of traditional values and modern education.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-[#0a0a2e]">30+ Years</h3>
                <p className="text-muted-foreground">
                  of academic excellence and holistic development
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-[#0a0a2e]">
                  1000+ Alumni
                </h3>
                <p className="text-muted-foreground">
                  successfully serving in various fields globally
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-[#0a0a2e]">
                  50+ Programs
                </h3>
                <p className="text-muted-foreground">
                  offering diverse educational opportunities
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-[#0a0a2e]">
                  95% Success
                </h3>
                <p className="text-muted-foreground">
                  reflects our student-centric approach
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src="/bg-3.jpg?height=600&width=800"
                alt="Students collaborating in a modern classroom setting"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10"></div>
          </div>
        </div>
      </section>
      <div>
        <CourseCards />
      </div>
      <div className="w-10/12 mx-auto px-4 py-12 md:py-24">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a2e] mb-8 text-center">
          Chat with Our AI Assistant
        </h2>
        <KalikaChatbot />
      </div>
      <Footer></Footer>
    </div>
  );
}
