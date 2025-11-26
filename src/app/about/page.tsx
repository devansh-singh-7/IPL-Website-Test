'use client'

import React from 'react'
import { useTranslation } from '@/contexts/TranslationContext'
import { Heart, Users, Award, CheckCircle } from 'lucide-react'
import CountUp from '@/components/ui/CountUp'

export default function About() {
    const { t } = useTranslation()

    const values = [
        { icon: Heart, titleKey: 'about.value1_title', descKey: 'about.value1_desc' },
        { icon: Users, titleKey: 'about.value2_title', descKey: 'about.value2_desc' },
        { icon: Award, titleKey: 'about.value3_title', descKey: 'about.value3_desc' },
    ]

    const milestones = [
        { year: '1995', key: 'about.milestone1' },
        { year: '1995-2000', key: 'about.milestone2' },
        { year: '2000+', key: 'about.milestone3' },
    ]

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-white py-12 sm:py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 animate-fade-in px-2">
                            {t('about.title', 'About Us')}
                        </h1>
                        <p className="text-lg sm:text-xl animate-fade-in px-4" style={{ animationDelay: '0.2s' }}>
                            {t('about.subtitle', 'Our Journey of Love, Friendship and Humanity')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 sm:py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Welcome Message */}
                        <div className="mb-8 sm:mb-12 text-center">
                            <div className="inline-block p-3 sm:p-4 bg-red-50 rounded-full mb-4 sm:mb-6">
                                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-red-700" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 px-2">
                                {t('home.welcome_title')}
                            </h2>
                            <div className="bg-red-50 border-l-4 border-red-700 p-4 sm:p-6 mb-4 sm:mb-6 rounded-r-lg">
                                <p className="text-base sm:text-lg italic text-gray-700">
                                    &quot;{t('home.founder_quote')}&quot;
                                </p>
                                <p className="text-right font-semibold text-red-800 mt-3 sm:mt-4 text-sm sm:text-base">
                                    - {t('home.founder_name')}
                                </p>
                            </div>
                        </div>

                        {/* About Content */}
                        <div className="prose prose-lg max-w-none mb-8 sm:mb-12">
                            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                                {t('home.about_intro')}
                            </p>
                            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                                {t('home.about_registration')}
                            </p>
                            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                                {t('home.about_80g')}
                            </p>
                        </div>

                        {/* Registration Details */}
                        <div className="bg-gray-50 rounded-lg p-5 sm:p-6 md:p-8 mb-8 sm:mb-12 shadow-md">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                                {t('about.registration_title', 'Registration &amp; Recognition')}
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-800 text-sm sm:text-base">{t('about.reg_societies', 'Bombay Societies Act, 1950')}</p>
                                        <p className="text-gray-600 text-xs sm:text-sm">{t('about.reg_societies_detail', 'Registered as a Social Welfare Trust')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{t('about.reg_trust', 'Bombay Public Trust Act')}</p>
                                        <p className="text-gray-600 text-sm">{t('about.reg_trust_detail', 'Registration #F23778')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{t('about.reg_80g', 'Section 80G Certificate')}</p>
                                        <p className="text-gray-600 text-sm">{t('about.reg_80g_detail', 'Tax benefit for donors')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray-800">{t('about.reg_welfare', 'Social Welfare Trust')}</p>
                                        <p className="text-gray-600 text-sm">{t('about.reg_welfare_detail', 'Serving communities since 1995')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Core Values */}
                        <div className="mb-12">
                            <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                                {t('about.core_values', 'Our Core Values')}
                            </h3>
                            <div className="grid md:grid-cols-3 gap-8">
                                {values.map((value, index) => {
                                    const Icon = value.icon
                                    return (
                                        <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                                            <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                                                <Icon className="w-8 h-8 text-red-700" />
                                            </div>
                                            <h4 className="text-xl font-bold text-gray-800 mb-3">
                                                {t(value.titleKey, 'Love')}
                                            </h4>
                                            <p className="text-gray-600">
                                                {t(value.descKey, 'Spreading love across communities')}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Timeline - Redesigned */}
                        <div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                                {t('about.journey', 'Our Journey')}
                            </h3>

                            <div className="relative max-w-5xl mx-auto">
                                {/* Center vertical line (md+) */}
                                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-red-200 -translate-x-1/2"></div>

                                <div className="space-y-8 md:space-y-12">
                                    {milestones.map((milestone, index) => {
                                        const isLeft = index % 2 === 0
                                        return (
                                            <div
                                                key={index}
                                                className="relative"
                                            >
                                                {/* Desktop Layout */}
                                                <div className="hidden md:flex md:items-center md:gap-8">
                                                    {/* Left side content */}
                                                    <div className={`flex-1 ${isLeft ? 'text-right pr-8' : 'order-2 text-left pl-8'}`}>
                                                        <div
                                                            className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 inline-block max-w-md ${isLeft ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}
                                                            style={{ animationDelay: `${index * 80}ms` }}
                                                        >
                                                            <p className="text-gray-700 leading-relaxed">
                                                                {t(milestone.key, 'Milestone description')}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Center year badge */}
                                                    <div className="relative shrink-0">
                                                        <div className={`timeline-year ${(/[-+]/.test(milestone.year) && milestone.year.length > 4) ? 'timeline-year--wide' : ''} animate-bounce-subtle`}>
                                                            <CountUp end={milestone.year} />
                                                        </div>
                                                    </div>

                                                    {/* Right side (empty for spacing) */}
                                                    <div className={`flex-1 ${isLeft ? 'order-2' : ''}`}></div>
                                                </div>

                                                {/* Mobile Layout */}
                                                <div className="md:hidden flex gap-4 items-start pl-16">
                                                    {/* Year badge on left */}
                                                    <div className="absolute left-8 -translate-x-1/2">
                                                        <div className="timeline-year-mobile">
                                                            <CountUp end={milestone.year} />
                                                        </div>
                                                    </div>

                                                    {/* Content card */}
                                                    <div className="flex-1">
                                                        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
                                                            <p className="text-gray-700 leading-relaxed text-sm">
                                                                {t(milestone.key, 'Milestone description')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <Heart className="w-12 h-12 mx-auto mb-6 text-red-700" />
                        <blockquote className="text-2xl font-light italic mb-4">
                            &quot;{t('home.mother_teresa_quote')}&quot;
                        </blockquote>
                        <cite className="text-lg not-italic font-semibold">- {t('home.mother_teresa')}</cite>
                    </div>
                </div>
            </section>
        </div>
    )
}
