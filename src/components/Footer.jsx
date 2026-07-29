const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        &copy; {currentYear}{" "}
        <a
          href="https://www.linkedin.com/in/imshaaz"
          target="_blank"
          rel="noopener noreferrer"
        >
          @imshaaz
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
