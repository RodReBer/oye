import { Link } from "react-router-dom";
const navigation = {
  main: [
    { name: "Ejercicio 1", href: "/obligatorio/ejercicio-1" },
    { name: "Ejercicio 2", href: "/obligatorio/ejercicio-2" },
    { name: "Ejercicio 3", href: "/obligatorio/ejercicio-3" },
    { name: "Juego 1", href: "/juego-uno" },
  ],
};

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6 cursor-pointer">
              <Link
                to={item.href}
                className="text-sm leading-6 text-gray-600 hover:text-gray-500 cursor-pointer"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 PYE, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
