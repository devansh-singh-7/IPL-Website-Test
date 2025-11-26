'use client'

import React, { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useTranslation } from '@/contexts/TranslationContext'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

type Errors = Record<string, string>

const IconBox: React.FC<React.PropsWithChildren> = ({ children }) => (
    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-50 text-red-700 shrink-0">
        {children}
    </div>
)

export default function Contact() {
    const { t } = useTranslation()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState<Errors>({})
    const [status, setStatus] = useState({ loading: false, success: false })
    const [honeypot, setHoneypot] = useState('')
    const [cooldownUntil, setCooldownUntil] = useState(0)
    const [now, setNow] = useState<number>(0)

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (status.success) {
            const timer = setTimeout(() => setStatus(s => ({ ...s, success: false })), 5000)
            return () => clearTimeout(timer)
        }
    }, [status.success])

    const validate = () => {
        const newErrors: Errors = {}
        if (!name.trim()) newErrors.name = t('contact.error_name_required', 'Please enter your name')
        if (!email.trim()) {
            newErrors.email = t('contact.error_email_required', 'Please enter your email')
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = t('contact.error_email_invalid', 'Please enter a valid email address')
        }
        if (!subject.trim()) {
            newErrors.subject = t('contact.error_subject_required', 'Please enter a subject')
        } else if (subject.trim().length < 3) {
            newErrors.subject = t('contact.error_subject_short', 'Subject is too short')
        } else if (subject.trim().length > 120) {
            newErrors.subject = t('contact.error_subject_long', 'Subject is too long')
        }
        if (!message.trim()) {
            newErrors.message = t('contact.error_message_required', 'Please enter a message')
        } else if (message.trim().length < 10) {
            newErrors.message = t('contact.error_message_short', 'Message is too short')
        }
        return newErrors
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (cooldownUntil && now < cooldownUntil) return
        setStatus({ loading: false, success: false })

        if (honeypot) {
            console.warn('Honeypot triggered; aborting send')
            return
        }

        const newErrors = validate()
        setErrors(newErrors)
        if (Object.keys(newErrors).length) {
            const summary = document.getElementById('form-error-summary') as HTMLDivElement | null
            if (summary) summary.focus()
            return
        }

        try {
            setStatus({ loading: true, success: false })
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string | undefined
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string | undefined
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string | undefined

            if (!serviceId || !templateId || !publicKey) {
                console.warn('EmailJS env vars missing; skipping real send')
                await new Promise((r) => setTimeout(r, 500))
                setStatus({ loading: false, success: true })
                setName(''); setEmail(''); setSubject(''); setMessage('')
                setErrors({})
                setCooldownUntil(Date.now() + 5000)
                return
            }

            const templateParams = {
                from_name: name,
                reply_to: email,
                subject,
                message,
                to_email: 'iplmumbai12395@gmail.com',
            }

            await emailjs.send(serviceId, templateId, templateParams, publicKey)
            setStatus({ loading: false, success: true })
            setName(''); setEmail(''); setSubject(''); setMessage('')
            setErrors({})
            setCooldownUntil(Date.now() + 5000)
        } catch (err) {
            console.error(err)
            setStatus({ loading: false, success: false })
            setErrors({ submit: t('contact.error_submit', 'Something went wrong. Please try again later.') })
        }
    }

    const addressLines = (t('footer.address', `103, Starview Apts., Opp. Corporate Park,\nV.N.Purav Marg, Chembur,\nMumbai - 400071, India`) || '').split('\n')

    return (
        <div className="text-gray-900">
            <section className="bg-white py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight">
                            {t('nav.contact', 'Contact Us')}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600">
                            {t('contact.get_in_touch', 'Get In Touch')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
                            <div className="space-y-6">
                                <h2 className="text-2xl md:text-3xl font-bold">{t('footer.contact_us', 'Contact Us')}</h2>
                                <p className="text-gray-600 max-w-md">{t('contact.info_intro', 'We are happy to help. Reach out via phone, email, or use the form to send us a message.')}</p>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <IconBox><MapPin className="w-5 h-5" /></IconBox>
                                        <div>
                                            <h3 className="font-semibold"> {t('contact.address_title', 'Address')} </h3>
                                            <address className="not-italic text-gray-700">
                                                {addressLines.map((line, i) => <div key={i}>{line}</div>)}
                                            </address>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <IconBox><Phone className="w-5 h-5" /></IconBox>
                                        <div>
                                            <h3 className="font-semibold">{t('contact.phone_title', 'Phone')}</h3>
                                            <a href="tel:+919892035187" className="text-gray-700 block">+91 9892035187</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <IconBox><Mail className="w-5 h-5" /></IconBox>
                                        <div>
                                            <h3 className="font-semibold">{t('footer.email', 'Email')}</h3>
                                            <a href="mailto:iplmumbai12395@gmail.com" className="text-gray-700 block">iplmumbai12395@gmail.com</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <IconBox><Clock className="w-5 h-5" /></IconBox>
                                        <div>
                                            <h3 className="font-semibold">{t('contact.hours_title', 'Office Hours')}</h3>
                                            <p className="text-gray-700">{t('contact.hours_detail', 'Monday - Saturday: 10:00 AM - 6:00 PM')}</p>
                                        </div>
                                    </div>

                                    <a
                                        href="https://maps.app.goo.gl/EfjFozQeVMFQEN9V8"
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        className="inline-block mt-2 px-5 py-2 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-200 transition"
                                        aria-label={t('contact.open_in_maps', 'Open in Google Maps (opens in new tab)')}
                                    >
                                        {t('contact.open_in_maps', 'Open in Maps')}
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('contact.send_message', 'Send Us a Message')}</h2>

                                {status.success && (
                                    <div role="status" className="rounded-md bg-green-50 border border-green-200 text-green-800 px-4 py-3 mb-4">
                                        {t('contact.success_message', 'Thanks — your message has been sent.')}
                                    </div>
                                )}

                                {Object.keys(errors).length > 0 && (
                                    <div id="form-error-summary" tabIndex={-1} className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-800 px-4 py-3" aria-live="assertive">
                                        <p className="font-semibold">{t('contact.form_errors_heading', 'There are problems with your submission')}</p>
                                        <ul className="mt-1 list-disc pl-5">
                                            {Object.entries(errors).map(([k, v]) => v && <li key={k}>{v}</li>)}
                                        </ul>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                                    {/* Honeypot field (hidden from users) */}
                                    <div className="hidden" aria-hidden="true">
                                        <label htmlFor="website">Website</label>
                                        <input
                                            id="website"
                                            name="website"
                                            type="text"
                                            value={honeypot}
                                            onChange={(e) => setHoneypot(e.target.value)}
                                            tabIndex={-1}
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('contact.form_name', 'Your Name')}</label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(s => ({ ...s, name: '' })) }}
                                            placeholder={t('contact.form_name_placeholder', 'Enter your name')}
                                            required
                                            aria-required="true"
                                            aria-invalid={errors.name ? 'true' : 'false'}
                                            aria-describedby={errors.name ? 'name-error' : undefined}
                                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-200"
                                        />
                                        {errors.name && <p id="name-error" className="mt-1 text-sm text-red-700">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('contact.form_email', 'Email Address')}</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(s => ({ ...s, email: '' })) }}
                                            placeholder={t('contact.form_email_placeholder', 'Enter your email')}
                                            required
                                            aria-required="true"
                                            aria-invalid={errors.email ? 'true' : 'false'}
                                            aria-describedby={errors.email ? 'email-error' : undefined}
                                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-200"
                                        />
                                        {errors.email && <p id="email-error" className="mt-1 text-sm text-red-700">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">{t('contact.form_subject', 'Subject')}</label>
                                        <input
                                            id="subject"
                                            type="text"
                                            value={subject}
                                            onChange={(e) => { setSubject(e.target.value); if (errors.subject) setErrors(s => ({ ...s, subject: '' })) }}
                                            placeholder={t('contact.form_subject_placeholder', 'Enter subject')}
                                            required
                                            aria-required="true"
                                            aria-invalid={errors.subject ? 'true' : 'false'}
                                            aria-describedby={errors.subject ? 'subject-error' : undefined}
                                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-200"
                                        />
                                        {errors.subject && <p id="subject-error" className="mt-1 text-sm text-red-700">{errors.subject}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('contact.form_message', 'Message')}</label>
                                        <textarea
                                            id="message"
                                            rows={6}
                                            value={message}
                                            onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors(s => ({ ...s, message: '' })) }}
                                            placeholder={t('contact.form_message_placeholder', 'Enter your message')}
                                            required
                                            aria-required="true"
                                            aria-invalid={errors.message ? 'true' : 'false'}
                                            aria-describedby={errors.message ? 'message-error' : undefined}
                                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white text-gray-900 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-200"
                                        />
                                        {errors.message && <p id="message-error" className="mt-1 text-sm text-red-700">{errors.message}</p>}
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={status.loading || (cooldownUntil ? now < cooldownUntil : false)}
                                            aria-disabled={status.loading || (cooldownUntil ? now < cooldownUntil : false)}
                                            className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition transform ${(status.loading || (cooldownUntil ? now < cooldownUntil : false)) ? 'opacity-80 cursor-not-allowed' : 'hover:scale-105'} bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-200`}
                                        >
                                            {status.loading && (
                                                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                                </svg>
                                            )}
                                            {(cooldownUntil ? now < cooldownUntil : false) && !status.loading
                                                ? t('contact.cooldown', 'Please wait...')
                                                : status.loading
                                                    ? t('contact.sending', 'Sending...')
                                                    : t('contact.form_submit', 'Send Message')}
                                        </button>
                                        {errors.submit && <p className="mt-2 text-sm text-primary-600">{errors.submit}</p>}
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8 bg-gray-100">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-bold mb-2">{t('contact.office_address', 'Our Office')}</h3>
                                <p className="text-sm text-red-700 font-semibold mb-2">{t('brand.name', "Indian Penpals&apos; League")}</p>
                                <address className="not-italic text-gray-700 leading-relaxed mb-4">
                                    {addressLines.map((line, i) => <div key={i}>{line}</div>)}
                                </address>
                                <p className="text-sm text-gray-600"><strong>{t('contact.directions', 'Directions')}:</strong> {t('contact.directions_text', 'Near Chembur station, opposite Corporate Park')}</p>
                            </div>

                            <div className="rounded-lg overflow-hidden shadow-sm h-64 md:h-72">
                                <iframe
                                    src="https://www.google.com/maps?q=103,+Starview+Apts,+Opp.+Corporate+Park,+V.N.Purav+Marg,+Chembur,+Mumbai+400071&output=embed"
                                    title={t('contact.map_title', 'Office location map')}
                                    width="100%"
                                    height="100%"
                                    loading="lazy"
                                    style={{ border: 0 }}
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
