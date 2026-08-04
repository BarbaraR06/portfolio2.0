import React from "react";
import { useTranslation } from "react-i18next";

export default function ExperienceModal() {
  const { t } = useTranslation("experience");

  const opengranoResponsibilities = t("opengrano.responsibilities", {
    returnObjects: true,
  }) as string[];
  const fisioahoraResponsibilities = t("fisioahora.responsibilities", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="font-bold flex flex-col gap-4 text-whiteText">
      {/* carreras */}
      <h2 className="text-lg xl2:text-4xl uppercase text-center text-defaultText">
        {t("career")}
      </h2>
      <div className="flex flex-col gap-2 rounded-2xl px-2 py-4 xl2:gap-12 bg-cvs-darkBlue mx-16">
        <div className="flex flex-col gap-2 rounded-2xl p-1 xl2:gap-12 mx-8 bg-cvs-lightBlue">
          <h3 className="text-lg xl2:text-4xl ml-2 text-defaultText">
            {t("education.ciberSecurity.title")}
          </h3>
          <p className="xl2:text-3xl ml-2">
            {t("education.ciberSecurity.institution")} (
            {t("education.ciberSecurity.period")})
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-2xl p-1 xl2:gap-12 mx-8 bg-cvs-lightBlue">
          <h3 className="text-lg xl2:text-4xl ml-2 text-defaultText">
            {t("education.computerScience.title")}
          </h3>
          <p className="xl2:text-3xl ml-2">
            {t("education.computerScience.institution")} (
            {t("education.computerScience.period")})
          </p>
        </div>
      </div>

      <h2 className=" text-lg xl2:text-4xl uppercase text-center text-defaultText">
        {t("experience")}
      </h2>
      <div className="flex flex-col gap-2 rounded-2xl px-2 py-4 xl2:gap-12 bg-cvs-darkBlue mx-16">
        {/* opengrano experiencia */}
        <div className="flex flex-col gap-2 rounded-2xl p-1 xl2:gap-12 mx-8 bg-cvs-lightBlue">
          <h3 className="text-lg xl2:text-4xl text-defaultText ml-2">
            {t("opengrano.title")}
          </h3>
          <p className="xl2:text-3xl ml-2">
            <a
              className="text-cvs-darkBlue hover:text-cvs-pink transition-colors"
              href={t("opengrano.companyLink")}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("opengrano.company")}
            {" "}</a>
            {t("opengrano.platform")} | Open source project on{" "}
            <a
              className="text-cvs-darkBlue hover:text-cvs-pink transition-colors"
              href={t("opengrano.theBadgeLink")}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("opengrano.theBadge")}
            </a>{" "}
            ({t("opengrano.period")})
          </p>
          <ul className="list-none space-y-1 xl2:text-3xl">
            {opengranoResponsibilities.map(
              (responsibility: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-cvs-darkBlue mr-2">•</span>
                  <span>{responsibility}</span>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* fisioahora experiencia */}
        <div className="flex flex-col gap-2 rounded-2xl p-1 xl2:gap-12 mx-8 bg-cvs-lightBlue">
          <h3 className="text-lg xl2:text-4xl ml-2 text-defaultText">
            {t("fisioahora.title")}
          </h3>
          <p className="xl2:text-3xl ml-2">
            {t("fisioahora.company")} - {t("fisioahora.internship")}{" "}
            <a
              className="text-cvs-darkBlue hover:text-cvs-pink transition-colors"
              href={t("fisioahora.footalentLink")}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("fisioahora.footalent")}
            </a>{" "}
            ({t("fisioahora.period")})
          </p>
          <ul className="list-none space-y-2 xl2:text-3xl">
            {fisioahoraResponsibilities.map(
              (responsibility: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-cvs-darkBlue mr-2">•</span>
                  <span>{responsibility}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
