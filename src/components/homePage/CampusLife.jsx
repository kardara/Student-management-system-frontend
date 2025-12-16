import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

export default function CampusLife() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useTranslation();
  
  return (
    <section className="section bg-light-bgSecondary dark:bg-dark-bgSecondary overflow-hidden">
      <div className="container mx-auto">
        <h2 className="section-title">{t('campusLife.title')}</h2>
        <p className="section-subtitle">{t('campusLife.subtitle')}</p>
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}
        >
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-2xl font-semibold mb-4">{t('campusLife.dayInTheLife.title')}</h3>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              {t('campusLife.dayInTheLife.description')}
            </p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-light-primary dark:bg-dark-primary rounded-full"></span>
                <span>{t('campusLife.features.studentOrganizations')}</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-light-primary dark:bg-dark-primary rounded-full"></span>
                <span>{t('campusLife.features.sportsFacilities')}</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="w-2 h-2 bg-light-primary dark:bg-dark-primary rounded-full"></span>
                <span>{t('campusLife.features.culturalEvents')}</span>
              </li>
            </ul>
            <a href="#campus-tour" className="btn-primary inline-block mt-4">
              {t('campusLife.virtualTourButton')}
            </a>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <img
              src="https://www.newtimes.co.rw/uploads/imported_images/files/main/articles/2021/11/15/auca_the_ceremony_was_attended_by_different_people_including_391_graduates_0.jpg"
              alt={t('campusLife.images.campusLibraryAlt')}
              className="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://auca.ac.rw/wp-content/uploads/2019/09/005-G3.jpg"
              alt={t('campusLife.images.studentLifeAlt')}
              className="rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};