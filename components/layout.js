import Head from 'next/head';

const Layout = ({ children }) => {
    return (
        <div className="main-wrapper">
            <main>{children}</main>
        </div>
    );
};

export default Layout;
