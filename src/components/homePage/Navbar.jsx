import React, { useState, useEffect } from 'react';
// import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import ThemeSwitcher from '../UI/ThemeSwitcher';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';


export default function Navbar() {

  // const { darkMode, toggleDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const user = useAuth();

  const { t } = useTranslation();


  const goToPortail = () => {
    console.log("Going to portail");
    if (user) {

      if (user.role) {
        navigate(`/${user.role}`)
      }
    } else {
    }

    navigate("/auth/login")
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? 'bg-light-bg dark:bg-dark-bg shadow-md py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center gap-5">
        <p className="flex items-center gap-12" onClick={() => navigate("/")}>
          <img src="https://yt3.ggpht.com/ytc/AIdro_kxYtR3zxZ06I5vQ41JCt4phG2gudke6oY9WCxoxo5jz_0=s68-c-k-c0x00ffffff-no-rj" className='w-10 rounded-full' alt="AUCA Logo" />
          {/* <span className="text-xl font-bold text-light-primary dark:text-dark-primary">AUCA</span> */}
        </p>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#programs" className="text-light-textPrimary dark:text-dark-textPrimary hover:text-light-primary dark:hover:text-dark-primary transition-colors">{t("homeNavBar.programs")}</a>
          <a href="#campus" className="text-light-textPrimary dark:text-dark-textPrimary hover:text-light-primary dark:hover:text-dark-primary transition-colors">{t("homeNavBar.campusLife")}</a>
          <a href="#research" className="text-light-textPrimary dark:text-dark-textPrimary hover:text-light-primary dark:hover:text-dark-primary transition-colors">{t("homeNavBar.research")}</a>
          <a href="#about" className="text-light-textPrimary dark:text-dark-textPrimary hover:text-light-primary dark:hover:text-dark-primary transition-colors">{t("homeNavBar.about")}</a>

          <div>
            <ThemeSwitcher />
          </div>


          <p className="btn-secondary" onClick={() => { goToPortail(); }}>
            {t("homeButtons.goToPortail")}</p>
          <p onClick={() => navigate("/apply")} className="btn-primary">{t("homeButtons.applyNow")}</p>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <div>
            <ThemeSwitcher />
          </div>

          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
            className="p-2 rounded-full bg-light-bgSecondary dark:bg-dark-bgSecondary hover:bg-light-border dark:hover:bg-dark-border transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0  bg-light-bg dark:bg-dark-bg z-40 md:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } mt-20`}
      >
        <nav className="flex flex-col space-y-6 p-6">
          <a
            href="#programs"
            className="text-lg font-medium text-light-textPrimary dark:text-dark-textPrimary"
            onClick={toggleMobileMenu}
          >
            {t("homeNavBar.programs")}
          </a>
          <a
            href="#campus"
            className="text-lg font-medium text-light-textPrimary dark:text-dark-textPrimary"
            onClick={toggleMobileMenu}
          >
            {t("homeNavBar.campusLife")}
          </a>
          <a
            href="#research"
            className="text-lg font-medium text-light-textPrimary dark:text-dark-textPrimary"
            onClick={toggleMobileMenu}
          >
            {t("homeNavBar.research")}
          </a>
          <a
            href="#about"
            className="text-lg font-medium text-light-textPrimary dark:text-dark-textPrimary"
            onClick={toggleMobileMenu}
          >
            {t}
          </a>
          <div className="pt-6 flex flex-col space-y-4">
            <button href="#login" className="btn-secondary w-full" onClick={() => { toggleMobileMenu(); goToPortail(); }}>
              {t("homeButtons.goToPortail")}
            </button>
            <button className="btn-primary w-full" onClick={() => { toggleMobileMenu(); navigate("/apply"); }}>
              {t("homeButtons.applyNow")}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
