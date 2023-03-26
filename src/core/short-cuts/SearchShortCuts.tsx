import { FC, useEffect } from 'react'

export const SearchShortCuts: FC = () => {
    const clickFirstTaskBoxButton = () => {
        const buttons = document.querySelectorAll('.task_box__action--button')
        if (buttons.length > 0) {
            const firstButton = buttons[0] as HTMLButtonElement
            firstButton.click()
        }
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.altKey && event.key === 'Enter') {
            clickFirstTaskBoxButton()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress)
        return () => {
            document.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    return null
}
