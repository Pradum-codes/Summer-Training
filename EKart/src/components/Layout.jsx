import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', padding: '1rem' }}>
        <Outlet /> {/* This renders the child route */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
