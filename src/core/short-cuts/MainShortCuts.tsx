import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const MainShortCuts = () => {
    const navigate = useNavigate()

    const handleGoToSearchPageShortCut = () => (event: KeyboardEvent) => {
        if (event.altKey && event.key === 's') {
            navigate('/search?isSearchAutoFocusOn=true')
        }
    }

    const handleGoToHomePageShortCut = () => (event: KeyboardEvent) => {
        if (event.altKey && event.key === 'h') {
            navigate('/home')
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleGoToSearchPageShortCut())
        document.addEventListener('keydown', handleGoToHomePageShortCut())
        return () => {
            document.removeEventListener('keydown', handleGoToSearchPageShortCut())
            document.removeEventListener('keydown', handleGoToHomePageShortCut())
        }
    }, [])

    return null
}
