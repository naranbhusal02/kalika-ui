'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Trophy, Award, GraduationCap, BarChart3 } from 'lucide-react'
import { motion } from "framer-motion"

const successStories = [
  {
    title: "Best School in Lumbini",
    icon: <Trophy className="h-8 w-8 text-yellow-500" />,
    description: "Awarded for outstanding academic excellence and holistic development",
    year: "2023",
    image: "celeberation.jpeg"
  },
  {
    title: "SEE Excellence",
    icon: <GraduationCap className="h-8 w-8 text-blue-500" />,
    description: "100% distinction results in SEE examinations 100% distinction results in SEE examinations",
    year: "2023",
    image: "gpa4.jpg"
  },
  {
    title: "Academic Achievement",
    icon: <BarChart3 className="h-8 w-8 text-green-500" />,
    description: "Highest performing school in regional assessments",
    year: "2023",
    image: "pride.jpg"
  },
  {
    title: "+2 Excellence Award",
    icon: <Award className="h-8 w-8 text-purple-500" />,
    description: "Outstanding performance in higher secondary education",
    year: "2023",
    image: "excellenceaward.jpg"
  },
]

export function SuccessStoryCarousel() {
  return (
    <section className="py-16 bg-[#0a0a2e]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Celebrating our achievements and milestones in academic excellence
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {successStories.map((story, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-white/10 backdrop-blur-lg border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-white/10 rounded-lg">
                          {story.icon}
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                          {story.year}
                        </Badge>
                      </div>
                      <div className="mb-4">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{story.title}</h3>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white/10 text-white hover:bg-white/20 border-0" />
          <CarouselNext className="bg-white/10 text-white hover:bg-white/20 border-0" />
        </Carousel>
      </div>
    </section>
  )
}
