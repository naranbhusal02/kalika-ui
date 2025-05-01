"use client";

import { Mail, Phone, Globe, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1e40af] mb-4">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Get in touch with Kalika Manavgyan Secondary School
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Information Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                Icon: Phone,
                title: "Call Us",
                details: ["071-437392", "071-437072"],
              },
              {
                Icon: Mail,
                title: "Email Us",
                details: [
                  "info@kalikaschool.edu.np",
                  "admin@kalikaschool.edu.np",
                ],
              },
              {
                Icon: Globe,
                title: "Visit Online",
                details: [
                  "www.kalikaschoolbtl.edu.np",
                  "Facebook • Twitter • Instagram",
                ],
              },
              {
                Icon: MapPin,
                title: "Visit Us",
                details: ["Kalikanagar, butwal", "Nepal"],
              },
            ].map(({ Icon, title, details }, idx) => (
              <Card
                key={idx}
                className="shadow-lg rounded-lg hover:shadow-xl hover:scale-105 transform transition-transform duration-300"
              >
                <CardContent className="p-6 text-center">
                  <Icon className="w-10 h-10 text-[#1e40af] mb-4 mx-auto" />
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  {details.map((detail, index) => (
                    <p key={index} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-[#1e40af] mb-6 text-center">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+977 98XXXXXXXX"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Your message here..."
                    className="w-full min-h-[150px]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center text-white justify-center">
                      <Send className="mr-2 h-5 w-5" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card className="shadow-lg rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7066.301988958281!2d83.45670014619827!3d27.68172769076306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39968680be065565%3A0xb62ed4f56f0f802d!2sKalika%20Manavgyan%20Secondary%20School!5e0!3m2!1sen!2snp!4v1743830215275!5m2!1sen!2snp"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Card>
        </div>
      </div>
    </div>
  );
}
