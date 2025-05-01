"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbulb, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Facebook, Twitter, Linkedin } from "lucide-react";

interface TeacherProfile {
  name: string;
  role: string;
  image: string;
  socials: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const otherTeachers: TeacherProfile[] = [
  {
    name: "Nitya Nanda Gyawali",
    role: " Chair Person (SMC)",
    image: "/about-1.svg?height=200&width=200",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Pitambar Banjade",
    role: "Vice- Principal Sector 1",
    image: "/about-2.svg?height=200&width=200",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Lok Raj Ghimire",
    role: "Vice Principal Sector 2",
    image: "/about-3.svg?height=200&width=200",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Arbind Dubey",
    role: "Computer Engineering Incharge",
    image: "/about-4.svg?height=200&width=200",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Sarbesh Barma",
    role: "IT Support",
    image: "/about-5.svg?height=200&width=200",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "Teacher Name 6",
    role: "Physics Teacher",
    image: "/about-6.svg?height=200&width=200",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
];

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState("vision");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center">
      {/* Hero Section */}
      <div className="w-10/12  flex flex-col items-center justify-center">
        <section className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-primary font-medium">About us</p>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a2e]">
                  Our Educational Journey
                </h2>
                <p className="text-muted-foreground text-lg">
                  Founded with a commitment to excellence in education, KMGSS
                  has been nurturing young minds and shaping future leaders with
                  a blend of traditional values and modern education.
                </p>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-[#0a0a2e]">
                    30+ Years
                  </h3>
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

        {/* Principal's Message */}
        <section className=" mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2  gap-8 items-center">
            <div className="relative">
              <Image
                src="/about-principal.svg?height=600&width=400"
                alt="Principal Dinesh Thapa"
                width={400}
                height={600}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                <h3 className="font-semibold">Principal</h3>
                <p className="text-sm text-gray-600">+977 9857031979</p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl text-primary font-bold">
                Meet Dinesh Thapa,
              </h2>
              <h3 className="text-2xl font-semibold">Your Head Teacher</h3>
              <p className="text-gray-600">
                At KMGSS, we believe in nurturing not just minds, but character.
                Our Kalika Montessori Programme forms the bedrock of our
                educational philosophy, ensuring a strong foundation for our
                8,053 students. We pride ourselves on striking the perfect
                balance between academic excellence and holistic development.
              </p>
              <div className="flex items-center space-x-4">
                <Button>Read Full Message</Button>
                <div className="flex space-x-2">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                facilities to our dedicated faculty, we ensure a holistic
                learning environment for all our students. Watch the video to
                learn more!
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

        {/* Vision, Mission, Values Tabs */}
        <section className=" py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Our Guiding Principles
            </h2>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full max-w-4xl mx-auto"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="vision">Vision</TabsTrigger>
                <TabsTrigger value="mission">Mission</TabsTrigger>
                <TabsTrigger value="values">Values</TabsTrigger>
              </TabsList>

              <div className="min-h-[400px]">
                {" "}
                {/* Fixed height container */}
                <TabsContent value="vision">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-4">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Lightbulb className="h-6 w-6 text-blue-600" />
                          </div>
                          <h3 className="text-2xl font-semibold">Our Vision</h3>
                          <p className="text-gray-600 leading-relaxed">
                            To be a beacon of educational excellence, inspiring
                            lifelong learners who will shape a better world
                            through:
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-blue-600" />
                              <span>Innovative teaching methodologies</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-blue-600" />
                              <span>State-of-the-art facilities</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-blue-600" />
                              <span>Global perspective in education</span>
                            </li>
                          </ul>
                        </div>
                        <div className="relative">
                          <img
                            src="/bg-1.jpg?height=300&width=400"
                            alt="Students in a modern learning environment"
                            className="rounded-lg shadow-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-lg" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="mission">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-4">
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            <Target className="h-6 w-6 text-green-600" />
                          </div>
                          <h3 className="text-2xl font-semibold">
                            Our Mission
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            To provide a nurturing environment that fosters:
                          </p>
                          <div className="grid gap-4">
                            <div className="p-4 bg-green-50 rounded-lg">
                              <h4 className="font-semibold mb-2">
                                Intellectual Growth
                              </h4>
                              <p className="text-sm text-gray-600">
                                Stimulating curiosity and critical thinking
                              </p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                              <h4 className="font-semibold mb-2">
                                Creative Expression
                              </h4>
                              <p className="text-sm text-gray-600">
                                Encouraging artistic and innovative thinking
                              </p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                              <h4 className="font-semibold mb-2">
                                Global Citizenship
                              </h4>
                              <p className="text-sm text-gray-600">
                                Preparing students for worldwide challenges
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <img
                            src="/bg-3.jpg?height=300&width=400"
                            alt="Students engaged in collaborative learning"
                            className="rounded-lg shadow-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-transparent rounded-lg" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="values">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="space-y-4">
                          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <Heart className="h-6 w-6 text-purple-600" />
                          </div>
                          <h3 className="text-2xl font-semibold">Our Values</h3>
                          <div className="grid gap-4">
                            <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                              <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                                <span className="font-semibold text-purple-700">
                                  1
                                </span>
                              </div>
                              <div>
                                <h4 className="font-semibold">Integrity</h4>
                                <p className="text-sm text-gray-600">
                                  Upholding honesty and ethical behavior
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                              <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                                <span className="font-semibold text-purple-700">
                                  2
                                </span>
                              </div>
                              <div>
                                <h4 className="font-semibold">Excellence</h4>
                                <p className="text-sm text-gray-600">
                                  Striving for the highest standards
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg">
                              <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                                <span className="font-semibold text-purple-700">
                                  3
                                </span>
                              </div>
                              <div>
                                <h4 className="font-semibold">Innovation</h4>
                                <p className="text-sm text-gray-600">
                                  Embracing new ideas and approaches
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <img
                            src="/bg-4.jpg?height=300&width=400"
                            alt="School community celebrating diversity"
                            className="rounded-lg shadow-lg"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent rounded-lg" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </section>

        <section className=" py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Meet Our Faculty
            </h2>
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {otherTeachers.map((teacher, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-0 relative group">
                        <Image
                          src={teacher.image}
                          alt={teacher.name}
                          width={200}
                          height={200}
                          className="w-full object-cover aspect-[3/4]"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                          <h3 className="text-xl font-semibold">
                            {teacher.name}
                          </h3>
                          <p className="text-sm mb-4">{teacher.role}</p>
                          <div className="flex space-x-4">
                            {Object.entries(teacher.socials).map(
                              ([platform, url]) => (
                                <a
                                  key={platform}
                                  href={url}
                                  className="text-white hover:text-primary transition-colors"
                                >
                                  {platform === "facebook" && (
                                    <Facebook className="w-5 h-5" />
                                  )}
                                  {platform === "twitter" && (
                                    <Twitter className="w-5 h-5" />
                                  )}
                                  {platform === "linkedin" && (
                                    <Linkedin className="w-5 h-5" />
                                  )}
                                </a>
                              )
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
      </div>
    </div>
  );
}
