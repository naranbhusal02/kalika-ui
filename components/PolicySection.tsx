'use client'

import { useState } from 'react'
// import Image from 'next/image'
import { motion } from 'framer-motion'
import Image from 'next/image'
interface PolicySectionProps {
  title: string
  icon: React.ReactNode
  content: string
  image: string
}

export default function PolicySection({ title, content, image }: PolicySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="bg-white overflow-hidden shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
        <Image src="/only-logo.svg" width={50} height={50} alt='logo'></Image>
          <h2 className="ml-3 text-2xl font-semibold text-gray-900">{title}</h2>
        </div>
        <img
          src={image}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-md mb-4"
        />  
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : '100px' }}
          className="overflow-hidden"
        >
          <p className="text-gray-600">{content}</p>
        </motion.div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-blue-500 hover:text-blue-600 focus:outline-none"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      </div>
    </motion.div>
  )
}

