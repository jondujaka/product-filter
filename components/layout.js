import Head from 'next/head';

const Layout = ({ children }) => {
    return (
        <div className="main-wrapper">
            <Head>
                <title>Ask Phill Assignment</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
