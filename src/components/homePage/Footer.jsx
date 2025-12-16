import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-light-bgSecondary dark:bg-dark-bgSecondary">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap size={32} className="text-light-primary dark:text-dark-primary mr-2" />
              <span className="text-xl font-bold">{t('footer.universityName')}</span>
            </div>
            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-primary dark:hover:text-dark-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-primary dark:hover:text-dark-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-primary dark:hover:text-dark-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-primary dark:hover:text-dark-primary">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-light-primary dark:hover:text-dark-primary">{t('footer.quickLinks.aboutUs')}</a></li>
              <li><a href="#" className="hover:text-light-primary dark:hover:text-dark-primary">{t('footer.quickLinks.programs')}</a></li>
              <li><a href="#" className="hover:text-light-primary dark:hover:text-dark-primary">{t('footer.quickLinks.admissions')}</a></li>
              <li><a href="#" className="hover:text-light-primary dark:hover:text-dark-primary">{t('footer.quickLinks.research')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.resources.title')}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-light-primary dark:hover:text-dark-primary">{t('footer.resources.studentPortal')}</a></li>
              <li><a href="#" className="hover:text-light-primary dark:hover:text-dark-primary">{t('footer.resources.library')}</a></li>
              <li><a href="#" className="hover:text-light-primary dark:hover:text-dark-primary">{t('footer.resources.careerServices')}</a></li>
              <li><a href="#" className="hover:text-light-primary dark:hover:text-dark-primary">{t('footer.resources.campusLife')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h3>
            <ul className="space-y-2">
              <li>{t('footer.contact.address.street')}</li>
              <li>{t('footer.contact.address.city')}</li>
              <li>{t('footer.contact.phone')}</li>
              <li>{t('footer.contact.email')}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-light-border dark:border-dark-border mt-8 pt-8 text-center text-light-textSecondary dark:text-dark-textSecondary">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};