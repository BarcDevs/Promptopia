import '@styles/global.css'
import {Nav} from '@components/Nav'
import {Provider} from '@app/contexts/Provider'
import {Notification} from '@components/Notfication'

export const metadata = {
    title: 'Promptopia',
    description: 'Discover, create, and share AI prompts.'
}
const RootLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <html>
        <body>
        <Provider>
            <Notification/>
            <div className="main">
                <div className="gradient"/>
            </div>

            <main className="app">
                <Nav/>
                {children}
            </main>
        </Provider>
        </body>
        </html>
    )
}

export default RootLayout