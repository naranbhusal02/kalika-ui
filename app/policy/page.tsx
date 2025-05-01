import { GraduationCap, Award, Home, Bus, BookOpen, ShieldCheck, Users } from 'lucide-react';
import Image from 'next/image';

export default function PolicyPage() {
  const policies = [
    {
      title: "Admission Policy",
      icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
      content: "Kalika School is committed to providing equal opportunities for all students. Our admission process is designed to be fair, transparent, and inclusive.",
      image: "/policy/admission.png"
    },
    {
      title: "Scholarship Policy",
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      content: "We believe in recognizing and nurturing talent. Our scholarship program aims to support deserving students in their educational journey.",
      image: "/policy/scholorship.png?height=200&width=300"
    },
    {
      title: "Hostel Policy",
      icon: <Home className="w-8 h-8 text-green-500" />,
      content: "Our hostel provides a safe and comfortable living environment for students. We have clear rules and regulations to ensure a positive experience for all residents.",
      image: "/policy/hostel.png?height=200&width=300"
    },
    {
      title: "Transportation Policy",
      icon: <Bus className="w-8 h-8 text-red-500" />,
      content: "Kalika School offers reliable and safe transportation services for our students. Our policy ensures punctuality and security during travel.",
      image: "/policy/bus.png?height=200&width=300"
    },
    {
      title: "Library Policy",
      icon: <BookOpen className="w-8 h-8 text-purple-500" />,
      content: "Our library is a hub of knowledge, offering a vast collection of resources. We encourage students to utilize this facility responsibly.",
      image: "/policy/hostel.png?height=200&width=300"
    },
    {
      title: "Safety Policy",
      icon: <ShieldCheck className="w-8 h-8 text-cyan-500" />,
      content: "Safety is our top priority. We have implemented strict measures to ensure a secure environment for students and staff.",
      image: "/policy/hostel.png?height=200&width=300"
    },
    {
      title: "Community Engagement Policy",
      icon: <Users className="w-8 h-8 text-orange-500" />,
      content: "We encourage active participation from parents and the community to foster a collaborative and supportive educational environment.",
      image: "/policy/hostel.png?height=200&width=300"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Our Policies</h1>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {policies.map((policy, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={policy.image}
                    alt={policy.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {policy.icon}
                    <h2 className="text-xl font-semibold ml-4 text-gray-700">{policy.title}</h2>
                  </div>
                  <p className="text-gray-600 text-sm">{policy.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
