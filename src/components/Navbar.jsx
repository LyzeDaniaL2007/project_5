import { Link, useSearchParams } from "react-router-dom";
import "./navbar.scss"; // Import SCSS
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Navbar = () => {
  const [getTheme, setTheme] = useContext(ThemeContext);
  const root = window.document.documentElement;

  const handleTheme = () => {
    if (getTheme === "Light") {
      setTheme("dark");
      root.classList.remove("Light");
      root.classList.add("dark");
    } else {
      setTheme("Light");
      root.classList.remove("dark");
      root.classList.add("Light");
    }
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams(value ? { search: value } : {});
  };

  return (
    <nav className="navbar">
      <div className="navbar bg-base-300 dark:bg-gray-800">
        <div className="flex-1">
          <Link to="/" className="navbar-brand text-gray-800 dark:text-white">
            Restaurant
          </Link>
        </div>

        <div className="flex-none space-x-4">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link className="text-gray-800 dark:text-white" to="/">Beranda</Link>
            </li>
            <li>
              <Link className="text-gray-800 dark:text-white" to="/Product">Product</Link>
            </li>
            <li>
              <Link className="text-gray-800 dark:text-white" to="/Country">Country</Link>
            </li>
            <li tabIndex={0}>
              <details className="relative">
                <summary className="text-gray-800 dark:text-white">More</summary>
                <ul className="p-2 bg-base-100 absolute right-0 z-50 mt-2 rounded-lg shadow-lg dark:bg-gray-700">
                  <li>
                    <Link className="text-gray-800 dark:text-white" to="/">Beranda</Link>
                  </li>
                  <li>
                    <Link className="text-gray-800 dark:text-white" to="/profil">Profil</Link>
                  </li>
                  <li>
                    <Link className="text-gray-800 dark:text-white" to="/list">List</Link>
                  </li>
                  <li>
                    <Link className="text-gray-800 dark:text-white" to="/Product">Product</Link>
                  </li>
                  <li>
                    <Link className="text-gray-800 dark:text-white" to="/Country">Country</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>

          {/* Search bar */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Search"
              value={searchParams.get("search") || ""}
              onChange={handleSearchChange}
              className="input"
            />
            <span className="search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>

          {/* Theme Toggle */}
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="toggle theme-controller"
              onChange={handleTheme}
              checked={getTheme === "Light"}
            />
            <span className="ml-2 text-gray-800 dark:text-white">Toggle Theme</span>
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
