'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"

interface CourseCard {
  title: string
  description: string
  icon: string
  color: string
}

const courses: CourseCard[] = [
  {
    title: "Management",
    description: "Learn essential business and management skills to lead organizations effectively.",
    icon: "/Images/management.png",
    color: "from-emerald-50 to-emerald-100"
  },
  {
    title: "Science",
    description: "Explore the wonders of science through our comprehensive curriculum.",
    icon: "/Images/science.png",
    color: "from-orange-50 to-orange-100"
  },
  {
    title: "Technical",
    description: "Master the latest technologies and technical skills for the digital age.",
    icon: "/Images/technical.png",
    color: "from-sky-50 to-sky-100"
  },
  {
    title: "Humanities",
    description: "Unleash your creativity through various art forms and design principles.",
    icon: "/Images/humanities.png",
    color: "from-purple-50 to-purple-100"
  },
  {
    title: "law",
    description: "Learn new languages and connect with cultures from around the world.",
    icon: "/Images/law.png",
    color: "from-pink-50 to-pink-100"
  },
  {
    title: "Hotel management",
    description: "Study healthcare and wellness to make a difference in people's lives.",
    icon: "/Images/hotelmanagement.png",
    color: "from-teal-50 to-teal-100"
  }
]

export default function CourseCards() {
  return (
    <section id='courses' className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl text-[#1457d8] font-bold mb-4">Explore Our Popular Courses</h2>
        <p className="text-xl text-muted-foreground">We offer the best facility in Nepal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='shadow-sm'
          >
            <motion.div
              whileHover={{ 
                scale: 1.02,
                y: -5
              }}
              className={`relative overflow-hidden rounded-2xl p-6 h-full
                bg-gradient-to-br ${course.color}
                transition-all duration-300 ease-out
                hover:shadow-lg hover:shadow-muted/20
                group cursor-pointer`}
            >
              <div className="relative flex items-center flex-col z-10">
                <div className="mb-4 w-40 rounded-full h-28">
                  <img
                    src={course.icon}
                    alt={`${course.title} icon`}
                    className="w-full h-full rounded-xl object-contain"
                  />
                </div>
                
                <h3 className="text-xl font-semibold text-[#1457d8] text-center mb-2 group-hover:text-primary">
                  {course.title}
                </h3>
                
                <p className="text-muted-foreground text-center mb-4">
                  {course.description}
                </p>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-primary font-medium"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

