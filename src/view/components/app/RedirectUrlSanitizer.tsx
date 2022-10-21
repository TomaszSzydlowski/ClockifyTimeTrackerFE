import { FC } from 'react'

export const RedirectUrlSanitizer: FC = () => {
    if (window.location.hash && window.location.hash.startsWith('#id_token')) {
        window.location.replace(window.location.origin)
    }

    return null
}
