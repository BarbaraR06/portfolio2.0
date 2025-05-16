import React from "react";
import { useTranslation } from "react-i18next";

export default function EducationModal() {
  const { t } = useTranslation("education");

  return (
    <div className="text-defaultText font-bold flex flex-col gap-4">
      <div className="flex flex-col gap-1 border-2 border-cvs-lightBlue rounded-lg p-4 xl2:gap-12">
        <h3 className="text-cvs-darkBlue text-lg xl2:text-4xl">
          {t("computerScience.title")}
        </h3>
        <p className="xl2:text-3xl">
          {t("computerScience.institution")} ({t("computerScience.period")})
        </p>
      </div>

      <div className="flex flex-col gap-1 border-2 border-cvs-lightBlue rounded-lg p-4 xl2:gap-12">
        <h3 className="text-cvs-darkBlue text-lg xl2:text-4xl">
          {t("industrialDesign.title")}
        </h3>
        <p className="xl2:text-3xl">
          {t("industrialDesign.institution")} ({t("industrialDesign.period")})
        </p>
      </div>
    </div>
  );
}
