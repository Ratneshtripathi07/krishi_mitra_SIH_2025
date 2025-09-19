'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseVoiceInputOptions {
    language?: string
    continuous?: boolean
    interimResults?: boolean
}

export function useVoiceInput(options: UseVoiceInputOptions = {}) {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isSupported, setIsSupported] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
        }
    }, [])

    const startListening = useCallback(() => {
        if (!isSupported) {
            setError('Speech recognition is not supported in this browser')
            return
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.continuous = options.continuous ?? false
        recognition.interimResults = options.interimResults ?? true
        recognition.lang = options.language ?? 'en-US'

        recognition.onstart = () => {
            setIsListening(true)
            setError(null)
        }

        recognition.onresult = (event) => {
            let finalTranscript = ''
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript
                }
            }
            setTranscript(finalTranscript)
        }

        recognition.onerror = (event) => {
            setError(`Speech recognition error: ${event.error}`)
            setIsListening(false)
        }

        recognition.onend = () => {
            setIsListening(false)
        }

        recognition.start()
    }, [isSupported, options])

    const stopListening = useCallback(() => {
        setIsListening(false)
    }, [])

    const resetTranscript = useCallback(() => {
        setTranscript('')
    }, [])

    return {
        isListening,
        transcript,
        error,
        isSupported,
        startListening,
        stopListening,
        resetTranscript,
    }
}