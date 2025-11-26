'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CountUpProps {
    end: string | number
    duration?: number
    className?: string
    prefix?: string
    suffix?: string
}

export default function CountUp({
    end,
    duration = 2000,
    className = '',
    prefix = '',
    suffix = ''
}: CountUpProps) {
    const [count, setCount] = useState(0)
    const [displayValue, setDisplayValue] = useState('')
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    // Parse the input to find the first number to animate
    // e.g. "1995" -> 1995
    // "1995-2000" -> 1995 (and we'll append "-2000")
    // "2000+" -> 2000 (and we'll append "+")
    const parseValue = (val: string | number) => {
        const stringVal = String(val)
        const match = stringVal.match(/(\d+)(.*)/)

        if (match) {
            return {
                number: parseInt(match[1], 10),
                rest: match[2] || '',
                fullString: stringVal
            }
        }

        return {
            number: 0,
            rest: stringVal,
            fullString: stringVal
        }
    }

    useEffect(() => {
        if (isInView) {
            const { number, rest, fullString } = parseValue(end)

            // If no number found (e.g. just text), just show it
            if (number === 0 && rest === fullString && !/\d/.test(fullString)) {
                setDisplayValue(fullString)
                return
            }

            let startTime: number | null = null
            let animationFrame: number

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp
                const progress = timestamp - startTime

                if (progress < duration) {
                    const percentage = Math.min(progress / duration, 1)
                    // Ease out quart
                    const ease = 1 - Math.pow(1 - percentage, 4)

                    const currentCount = Math.floor(number * ease)
                    setCount(currentCount)
                    setDisplayValue(`${currentCount}${rest}`)

                    animationFrame = requestAnimationFrame(animate)
                } else {
                    setCount(number)
                    setDisplayValue(`${number}${rest}`)
                }
            }

            animationFrame = requestAnimationFrame(animate)

            return () => cancelAnimationFrame(animationFrame)
        }
    }, [isInView, end, duration])

    return (
        <span ref={ref} className={className}>
            {prefix}{displayValue || (isInView ? parseValue(end).fullString : '0')}{suffix}
        </span>
    )
}
