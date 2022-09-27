import Header from "./header";
import Footer from "./footer";
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="container">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;