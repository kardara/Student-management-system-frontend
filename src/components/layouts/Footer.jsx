import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className='bg-bg-secondary-light dark:bg-bg-secondary-dark p-3 xl:col-span-20 xl:row-span-1 '>
      <p className='text-center'>
        {t('simpleFooter.copyright', { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}

export default Footer;