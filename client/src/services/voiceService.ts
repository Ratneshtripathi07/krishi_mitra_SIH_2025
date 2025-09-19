interface VoiceServiceConfig {
    googleCloudApiKey?: string
    language?: string
}

class VoiceService {
    private config: VoiceServiceConfig

    constructor(config: VoiceServiceConfig = {}) {
        this.config = {
            language: 'en-US',
            ...config,
        }
    }

    // Web Speech API implementation
    async recognizeSpeechWeb(audioBlob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                reject(new Error('Speech recognition not supported'))
                return
            }

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            const recognition = new SpeechRecognition()

            recognition.continuous = false
            recognition.interimResults = false
            recognition.lang = this.config.language || 'en-US'

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript
                resolve(transcript)
            }

            recognition.onerror = (event) => {
                reject(new Error(`Speech recognition error: ${event.error}`))
            }

            recognition.start()
        })
    }

    // Google Cloud Speech-to-Text API implementation
    async recognizeSpeechGoogle(audioBlob: Blob): Promise<string> {
        if (!this.config.googleCloudApiKey) {
            throw new Error('Google Cloud API key not configured')
        }

        const base64Audio = await this.blobToBase64(audioBlob)

        const response = await fetch(
            `https://speech.googleapis.com/v1/speech:recognize?key=${this.config.googleCloudApiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    config: {
                        encoding: 'WEBM_OPUS',
                        sampleRateHertz: 48000,
                        languageCode: this.config.language,
                    },
                    audio: {
                        content: base64Audio,
                    },
                }),
            }
        )

        const result = await response.json()

        if (result.results && result.results.length > 0) {
            return result.results[0].alternatives[0].transcript
        }

        throw new Error('No speech recognized')
    }

    private async blobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                const base64 = (reader.result as string).split(',')[1]
                resolve(base64)
            }
            reader.onerror = reject
            reader.readAsDataURL(blob)
        })
    }

    // Text-to-Speech using Web Speech API
    speak(text: string, options: { lang?: string; rate?: number; pitch?: number } = {}) {
        if (!('speechSynthesis' in window)) {
            throw new Error('Speech synthesis not supported')
        }

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = options.lang || this.config.language || 'en-US'
        utterance.rate = options.rate || 1
        utterance.pitch = options.pitch || 1

        speechSynthesis.speak(utterance)
    }
}

export default VoiceService