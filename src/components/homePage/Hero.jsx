import React from "react";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-bg-light dark:bg-bg-dark">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-slideInRight">
            <div className="flex justify-center mb-6">
              <GraduationCap
                size={64}
                className="text-light-primary dark:text-dark-primary"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary animate-slideUp">
              {t("homeHero.title")}
            </h1>
            <p className="text-xl text-light-textSecondary dark:text-dark-textSecondary mb-8 animate-fadeIn">
              {t("homeHero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp">
              <p
                onClick={() => navigate("/apply")}
                className="btn-primary text-lg"
              >
                {t("homeButtons.applyNow")}
              </p>
              <p href="#programs" className="btn-secondary text-lg">
                {t("homeButtons.explorePrograms")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
