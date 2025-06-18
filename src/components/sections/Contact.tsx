'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { motion } from 'framer-motion'
import { contact } from '@/content'

// Схема валидации
const schema = yup.object({
  name: yup.string().required('Имя обязательно'),
  email: yup.string().email('Введите корректный email').required('Email обязателен'),
  subject: yup.string().required('Тема обязательна'),
  message: yup.string().required('Сообщение обязательно').min(10, 'Минимум 10 символов'),
}).required()

type FormData = yup.InferType<typeof schema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Небольшая задержка для защиты от спама
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      console.log('Отправляем данные:', data)
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "56416253-f5ea-4191-8695-62269233766c",
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          from_name: data.name,
          replyto: data.email,
          honeypot: "",
          botcheck: "",
        }),
      })

      console.log('Статус ответа:', response.status)
      
      const result = await response.json()
      console.log('Ответ от Web3Forms:', result)
      
      if (result.success) {
        setSubmitStatus('success')
        reset()
      } else {
        console.error('Ошибка Web3Forms:', result.message)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Ошибка при отправке:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen flex items-center bg-gray-50 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 tracking-tight leading-tight">
              {contact.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              {contact.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
            {/* Контактная информация */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-medium mb-4 text-gray-900">
                  Свяжитесь с нами
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                  Мы всегда рады ответить на ваши вопросы и помочь с бронированием. 
                  Обращайтесь любым удобным способом!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Телефон</h4>
                    <a href={`tel:${contact.phone}`} className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base">
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Адреса</h4>
                    <div className="space-y-1">
                      {contact.addresses.map((address, index) => (
                        <div key={index}>
                          <a 
                            href={address.mapsUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 text-xs sm:text-sm hover:text-blue-800 transition-colors cursor-pointer break-words"
                          >
                            {address.text}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Часы работы</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Пн-Пт: 8:00 - 22:00<br />
                      Сб-Вс: 9:00 - 23:00
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Форма */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg sm:text-xl font-medium mb-4 text-gray-900">
                  Отправить сообщение
                </h3>
                
                {/* Уведомления */}
                {submitStatus === 'success' && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-xs sm:text-sm">Сообщение отправлено! Мы свяжемся с вами в ближайшее время.</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-xs sm:text-sm">Ошибка при отправке. Возможно, сообщение помечено как спам. Попробуйте еще раз через минуту или позвоните нам.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Honeypot поле для защиты от спама */}
                  <input
                    type="text"
                    name="honeypot"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">
                        Имя *
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        id="name"
                        className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none text-sm sm:text-base ${
                          errors.name 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-gray-900'
                        }`}
                        placeholder="Ваше имя"
                      />
                      {errors.name && (
                        <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">
                        Email *
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        id="email"
                        className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none text-sm sm:text-base ${
                          errors.email 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-gray-900'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">
                      Тема *
                    </label>
                    <input
                      {...register('subject')}
                      type="text"
                      id="subject"
                      className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none text-sm sm:text-base ${
                        errors.subject 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-gray-900'
                      }`}
                      placeholder="Тема сообщения"
                    />
                    {errors.subject && (
                      <p className="text-red-600 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1 text-gray-700">
                      Сообщение *
                    </label>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={4}
                      className={`w-full px-3 py-2 rounded-lg border transition-colors resize-none focus:outline-none text-sm sm:text-base ${
                        errors.message 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-gray-900'
                      }`}
                      placeholder="Ваше сообщение..."
                    />
                    {errors.message && (
                      <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base ${
                      isSubmitting
                        ? 'bg-gray-400 text-white'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {isSubmitting ? 'Отправляем...' : 'Отправить сообщение'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 