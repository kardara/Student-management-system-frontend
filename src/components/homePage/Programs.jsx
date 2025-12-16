import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

export default function Programs() {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useTranslation();

  const programs = [
    {
      title: t('programs.list.informationTechnology.title'),
      level: t('programs.list.informationTechnology.level'),
      description: t('programs.list.informationTechnology.description'),
      image: "https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg"
    },
    {
      title: t('programs.list.businessAdministration.title'),
      level: t('programs.list.businessAdministration.level'),
      description: t('programs.list.businessAdministration.description'),
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
    },
    {
      title: t('programs.list.education.title'),
      level: t('programs.list.education.level'),
      description: t('programs.list.education.description'),
      image: "https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg"
    },
    {
      title: t('programs.list.theology.title'),
      level: t('programs.list.theology.level'),
      description: t('programs.list.theology.description'),
      image: "https://www.simplycatholic.com/wp-content/uploads/2020/11/shutterstock_597716564.jpg"
    }
  ];

  return (
    <section className="section">
      <div className="container mx-auto">
        <h2 className="section-title">{t('programs.title')}</h2>
        <p className="section-subtitle">{t('programs.subtitle')}</p>
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {programs.map((program, index) => (
            <div key={index} className="card group overflow-hidden">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
              <p className="text-light-primary dark:text-dark-primary mb-2">{program.level}</p>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                {program.description}
              </p>
              <a
                href="#learn-more"
                className="inline-block mt-4 text-light-primary dark:text-dark-primary hover:underline"
              >
                {t('programs.learnMore')}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};