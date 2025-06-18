'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { hero } from '@/content'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.backgroundImage || "/images/hero/img-hero-main-bg.png"}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Увеличил затемнение для лучшей читаемости на мобильных */}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 px-2 sm:px-0 leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
          >
            <Link
              href={hero.primaryButton.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors text-base sm:text-lg shadow-lg hover:shadow-xl"
            >
              {hero.primaryButton.text}
            </Link>
            <Link
              href={hero.secondaryButton.href}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors text-base sm:text-lg"
            >
              {hero.secondaryButton.text}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 