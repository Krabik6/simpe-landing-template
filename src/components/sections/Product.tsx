'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { product } from '@/content'

export default function Product() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section id="about" className="min-h-screen flex items-center py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 sm:mb-8 tracking-tight leading-tight">
              {product.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              {product.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start lg:items-center">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden order-2 lg:order-1"
            >
              <Image
                src={product.features[activeFeature].image}
                alt={product.features[activeFeature].title}
                fill
                className="object-cover"
                priority={activeFeature === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3 sm:space-y-4 order-1 lg:order-2"
            >
              {product.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  onClick={() => setActiveFeature(index)}
                  className={`group relative p-4 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? 'bg-white border-gray-200 shadow-sm'
                      : 'bg-transparent border-gray-100 hover:border-gray-200 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      activeFeature === index
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }`}>
                      <span className="text-xs sm:text-sm font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base sm:text-lg font-medium mb-1 sm:mb-2 transition-colors duration-300 ${
                        activeFeature === index ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
                        activeFeature === index ? 'text-gray-600' : 'text-gray-500'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 