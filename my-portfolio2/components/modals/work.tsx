import React from "react";
import { useTranslation } from "react-i18next";

export default function WorkModal() {
  const { t } = useTranslation("work");

  const opengranoResponsibilities = (t("opengrano.responsibilities", { returnObjects: true }) as string[]);
  const fisioahoraResponsibilities = (t("fisioahora.responsibilities", { returnObjects: true }) as string[]);

  return (
    <div className="text-defaultText font-bold flex flex-col gap-4">
      <div className="flex flex-col gap-1 border-2 border-cvs-lightBlue rounded-lg p-4 xl2:gap-6">
        <h3 className="text-cvs-darkBlue text-lg xl2:text-4xl">
          {t("opengrano.title")}
        </h3>
        <p className="xl2:text-3xl font-bold">
          <a
            className="text-cvs-lightBlue hover:text-cvs-pink transition-colors"
            href={t("opengrano.companyLink")}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("opengrano.company")}
          </a>{" "}
          - {t("opengrano.platform")} | Open source project on{" "}
          <a
            className="text-cvs-lightBlue hover:text-cvs-pink transition-colors"
            href={t("opengrano.theBadgeLink")}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("opengrano.theBadge")}
          </a>{" "}
          ({t("opengrano.period")})
        </p>
        <ul className="list-none space-y-2 xl2:text-3xl">
          {opengranoResponsibilities.map((responsibility: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="text-cvs-lightBlue mr-2">•</span>
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-1 border-2 border-cvs-lightBlue rounded-lg p-4 xl2:gap-6">
        <h3 className="text-cvs-darkBlue text-lg xl2:text-4xl">
          {t("fisioahora.title")}
        </h3>
        <p className="xl2:text-3xl">
          {t("fisioahora.company")} - {t("fisioahora.internship")}{" "}
          <a
            className="text-cvs-lightBlue hover:text-cvs-pink transition-colors"
            href={t("fisioahora.footalentLink")}
            rel="noopener noreferrer"
            target="_blank"
          >
            {t("fisioahora.footalent")}
          </a>{" "}
          ({t("fisioahora.period")})
        </p>
        <ul className="list-none space-y-2 xl2:text-3xl">
          {fisioahoraResponsibilities.map((responsibility: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="text-cvs-lightBlue mr-2">•</span>
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
