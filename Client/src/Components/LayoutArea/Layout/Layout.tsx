import Routing from '../../Routing/Routing';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import './Layout.css'

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header>
                    <Header />
            </header>
            <div className='content'>
                <aside>
                    <Menu />
                </aside>
                <main>
                    <Routing />
                </main>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout

