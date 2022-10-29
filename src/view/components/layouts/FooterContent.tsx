import { FC } from 'react'

import { FooterMenu } from '../custom/FooterMenu'
import { TrackerPlayer } from '../custom/TrackerPlayer'

export const FooterContent: FC = () => {
    return (
        <div className="footer_box">
            <TrackerPlayer />
            <FooterMenu />
        </div>
    )
}
