import '../styles/globals.css'
import Navbar from './components/Navbar';
import Provider from './components/Provider';



export const Metadata = {
    title: 'PromptSphere',
    description: "Découvrez et partagez l'AI prompt",

}
const RootLayout = ({ children }) => (
    <html lang='fr'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app'>
                    <Navbar />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
);

export default RootLayout;