import React from 'react';
import { Calendar, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CallToAction() {
  const navigate = useNavigate()
  const { t } = useTranslation();
  
  return (
    <section className="section bg-bg-secondary-light dark:bg-bg-secondary-dark">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">{t('callToAction.title')}</h2>
          <p className="section-subtitle">
            {t('callToAction.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="card hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <Calendar size={32} className="text-light-primary dark:text-dark-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('callToAction.scheduleVisit.title')}</h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                {t('callToAction.scheduleVisit.description')}
              </p>
              <a href="#schedule" className="btn-secondary w-full">
                {t('callToAction.scheduleVisit.button')}
              </a>
            </div>
            <div className="card hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <Mail size={32} className="text-light-primary dark:text-dark-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t('callToAction.applyNow.title')}</h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                {t('callToAction.applyNow.description')}
              </p>
              <p onClick={() => navigate("/apply")} className="btn-primary w-full">
                {t('callToAction.applyNow.button')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};