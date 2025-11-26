'use client'

import React, { useState } from 'react'
import { useTranslation } from '@/contexts/TranslationContext'
import { Users, Heart, Calendar, MapPin, Camera, Handshake, ArrowRight, Sparkles, Star, Globe } from 'lucide-react'

export default function FriendshipMeet() {
    const { t } = useTranslation()
    const [selectedYear, setSelectedYear] = useState('2024')

    const friendshipMeets = [
        {
            year: '2024',
            number: '28',
            titleEn: '28th Friendship Meet',
            date: '24 MAY 2025',
            location: 'To be announced',
            description: 'The 28th Annual Friendship Meet bringing together pen friends from across India and abroad',
            status: 'upcoming'
        },
        {
            year: '2024',
            number: '27',
            titleEn: '27th Friendship Meet',
            date: '25 MAY 2024',
            location: 'Kuttalam, Tenkasi District',
            description: '27th Annual Friendship Meet held at TMNS Hall, Kuttalam',
            status: 'completed'
        },
        {
            year: '2023',
            number: '26',
            titleEn: '26th Friendship Meet',
            date: '20 MAY 2023',
            location: 'New Delhi',
            description: 'Shri Vittal Mandir Hall, Ramakrishnapuram, New Delhi',
            status: 'completed'
        }
    ]

    const highlights = [
        { icon: Users, title: 'Meet Pen Friends', description: 'Connect with friends you\'ve been writing to for years', color: 'from-blue-500 to-blue-600' },
        { icon: Heart, title: 'Family Gathering', description: 'Bring your family and celebrate together', color: 'from-pink-500 to-pink-600' },
        { icon: Globe, title: 'Cultural Exchange', description: 'Experience diverse cultures and traditions', color: 'from-purple-500 to-purple-600' },
        { icon: Camera, title: 'Memorable Moments', description: 'Create lasting memories and friendships', color: 'from-orange-500 to-orange-600' },
    ]

    const stats = [
        { number: '28+', label: 'Annual Meets', icon: Calendar },
        { number: '1000+', label: 'Attendees', icon: Users },
        { number: '50+', label: 'Cities', icon: MapPin },
        { number: '30+', label: 'Years', icon: Star }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Modern & Dynamic */}
            <section className="relative bg-linear-to-br from-red-700 via-red-800 to-red-900 text-white overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 py-32 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full mb-8 border border-white/20 shadow-2xl animate-fade-in">
                            <Users className="w-12 h-12" />
                        </div>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-semibold">Annual Celebration</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            Friendship Meet
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-white/90 mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                            நட்புச் சங்கமம்
                        </p>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            Where letters transform into lasting bonds and pen friends become family
                        </p>
                    </div>
                </div>

                {/* Wave divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all hover:-translate-y-1">
                                <Icon className="w-8 h-8 mx-auto mb-3 text-red-700" />
                                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* What is Friendship Meet */}
            <section className="container mx-auto px-4 mb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">What is Friendship Meet?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            An annual gathering where pen friends from across the world meet in person to celebrate the bonds formed through letters
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {highlights.map((highlight, index) => {
                            const Icon = highlight.icon
                            return (
                                <div key={index} className="group relative bg-linear-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-red-200 transition-all hover:shadow-xl">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-linear-to-br ${highlight.color} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
                                    <p className="text-gray-600">{highlight.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Past Meets Section */}
            <section className="bg-linear-to-b from-gray-50 to-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Annual Friendship Meets</h2>
                        <p className="text-lg text-gray-600">Explore our journey through the years</p>
                    </div>

                    {/* Year Filter */}
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex bg-white rounded-full shadow-lg border border-gray-200 p-2 gap-2">
                            {['2024', '2023', '2022'].map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-8 py-3 rounded-full font-semibold transition-all ${selectedYear === year
                                            ? 'bg-red-700 text-white shadow-md'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Meet Cards */}
                    <div className="max-w-4xl mx-auto space-y-6">
                        {friendshipMeets
                            .filter(m => m.year === selectedYear)
                            .map((meet, index) => (
                                <article
                                    key={index}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition-all hover:-translate-y-1"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        {/* Left side - Number badge */}
                                        <div className="md:w-48 bg-linear-to-br from-red-600 to-red-800 p-8 flex flex-col items-center justify-center text-white">
                                            <div className="text-6xl font-bold mb-2">{meet.number}</div>
                                            <div className="text-sm font-semibold opacity-90">Annual Meet</div>
                                            {meet.status === 'upcoming' && (
                                                <div className="mt-4 px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                                                    UPCOMING
                                                </div>
                                            )}
                                        </div>

                                        {/* Right side - Details */}
                                        <div className="flex-1 p-8">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-700 transition-colors">
                                                {meet.titleEn}
                                            </h3>

                                            <div className="flex flex-wrap gap-6 mb-4">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Calendar className="w-5 h-5 text-red-700" />
                                                    <span className="font-medium">{meet.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <MapPin className="w-5 h-5 text-red-700" />
                                                    <span>{meet.location}</span>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-6 leading-relaxed">
                                                {meet.description}
                                            </p>

                                            <button className="inline-flex items-center gap-2 text-red-700 font-semibold hover:gap-3 transition-all">
                                                View Details
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative bg-linear-to-br from-red-700 to-red-800 text-white py-20 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full mb-6 border border-white/20">
                        <Handshake className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Join Our Next Friendship Meet
                    </h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Experience the joy of meeting friends who share your passion for friendship and humanity
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-700 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        Contact Us for Details
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>
        </div>
    )
}
