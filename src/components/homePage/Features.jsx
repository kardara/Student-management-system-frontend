import React from 'react';
import { Award, Users, Globe, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const { ref: ref1, isVisible: isVisible1 } = useScrollAnimation();
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation();
  const { ref: ref3, isVisible: isVisible3 } = useScrollAnimation();
  const { ref: ref4, isVisible: isVisible4 } = useScrollAnimation();
  const { t } = useTranslation();

  const features = [
    {
      ref: ref1,
      isVisible: isVisible1,
      icon: <Award size={32} />,
      title: t('features.academicExcellence.title'),
      description: t('features.academicExcellence.description')
    },
    {
      ref: ref2,
      isVisible: isVisible2,
      icon: <Users size={32} />,
      title: t('features.diverseCommunity.title'),
      description: t('features.diverseCommunity.description')
    },
    {
      ref: ref3,
      isVisible: isVisible3,
      icon: <Globe size={32} />,
      title: t('features.globalOpportunities.title'),
      description: t('features.globalOpportunities.description')
    },
    {
      ref: ref4,
      isVisible: isVisible4,
      icon: <BookOpen size={32} />,
      title: t('features.modernFacilities.title'),
      description: t('features.modernFacilities.description')
    }
  ];

  return (
    <section className="section bg-light-bgSecondary dark:bg-dark-bgSecondary">
      <div className="container mx-auto">
        <h2 className="section-title">{t('features.title')}</h2>
        <p className="section-subtitle">{t('features.subtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={feature.ref}
              className={`card hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ${
                feature.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-light-primary dark:text-dark-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};