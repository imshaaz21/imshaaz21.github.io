const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p>&copy; {currentYear} Shanaaz Ahamed</p>
        </footer>
    );
};

export default Footer;
