const Footer = () => {
  const footerSections = {
    'RISN': ['About', 'Careers', 'Press'],
    'Ecosystem': ['Body-Twin SDK', 'Designer API', 'Telemetry'],
    'Support': ['Contact', 'Returns', 'FAQ'],
    'Legal': ['Privacy Policy', 'Terms of Service']
  };

  return (
    <footer className="border-t border-risn-gray-800 bg-risn-dark">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-mono text-sm font-semibold tracking-wider text-risn-gray-200">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-risn-gray-700 transition-colors hover:text-risn-light">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-risn-gray-800 pt-8 text-center text-sm text-risn-gray-700">
          <p>&copy; {new Date().getFullYear()} RISN Technologies Inc. All rights reserved.</p>
          <p className="mt-1">Fashion Intelligence Protocol v2.1.8</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
