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

  const languages = t("stack.languages", {
    returnObjects: true,
  }) as string[];

  const frameworks = t("stack.frameworks", {
    returnObjects: true,
  }) as string[];

  const databases = t("stack.databases", {
    returnObjects: true,
  }) as string[];

  const tools = t("stack.tools", {
    returnObjects: true,
  }) as string[];

  const devApiTools = t("stack.devApiTools", {
    returnObjects: true,
  }) as string[];

  return (
    <div className="flex flex-col gap-4 font-bold text-whiteText">
      {/* Carreras */}
      <h2 className="text-center text-lg uppercase text-defaultText xl2:text-4xl">
        {t("career")}
      </h2>

      <div className="mx-16 flex flex-col gap-2 rounded-2xl bg-cvs-darkBlue px-2 py-4 xl2:gap-12">
        {/* Ciberseguridad */}
        <div className="mx-8 flex flex-col gap-2 rounded-2xl bg-whiteText p-3 text-defaultText xl2:gap-12">
          <h3 className="ml-2 text-lg xl2:text-4xl">
            {t("education.ciberSecurity.title")}
          </h3>

          <p className="ml-2 xl2:text-3xl">
            {t("education.ciberSecurity.institution")} (
            {t("education.ciberSecurity.period")})
          </p>
        </div>

        {/* Computer Science */}
        <div className="mx-8 flex flex-col gap-2 rounded-2xl bg-whiteText p-3 text-defaultText xl2:gap-12">
          <h3 className="ml-2 text-lg xl2:text-4xl">
            {t("education.computerScience.title")}
          </h3>

          <p className="ml-2 xl2:text-3xl">
            {t("education.computerScience.institution")} (
            {t("education.computerScience.period")})
          </p>
        </div>
      </div>

      {/* Experiencia */}
      <h2 className="text-center text-lg uppercase text-defaultText xl2:text-4xl">
        {t("experience")}
      </h2>

      <div className="mx-16 flex flex-col gap-2 rounded-2xl bg-cvs-darkBlue px-2 py-4 xl2:gap-12">
        {/* Opengrano */}
        <div className="mx-8 flex flex-col gap-2 rounded-2xl bg-whiteText p-3 text-defaultText xl2:gap-12">
          <h3 className="ml-2 text-lg xl2:text-4xl">
            {t("opengrano.title")}
          </h3>

          <p className="ml-2 xl2:text-3xl">
            <a
              className="text-cvs-darkBlue transition-colors hover:text-cvs-pink"
              href={t("opengrano.companyLink")}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("opengrano.company")}{" "}
            </a>

            {t("opengrano.platform")} | Open source project on{" "}

            <a
              className="text-cvs-darkBlue transition-colors hover:text-cvs-pink"
              href={t("opengrano.theBadgeLink")}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("opengrano.theBadge")}
            </a>{" "}

            ({t("opengrano.period")})
          </p>

          <ul className="list-none space-y-1 xl2:text-3xl">
            {opengranoResponsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-cvs-darkBlue">•</span>
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FisioAhora */}
        <div className="mx-8 flex flex-col gap-2 rounded-2xl bg-whiteText p-3 text-defaultText xl2:gap-12">
          <h3 className="ml-2 text-lg xl2:text-4xl">
            {t("fisioahora.title")}
          </h3>

          <p className="ml-2 xl2:text-3xl">
            {t("fisioahora.company")} - {t("fisioahora.internship")}{" "}

            <a
              className="text-cvs-darkBlue transition-colors hover:text-cvs-pink"
              href={t("fisioahora.footalentLink")}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("fisioahora.footalent")}
            </a>{" "}

            ({t("fisioahora.period")})
          </p>

          <ul className="list-none space-y-2 xl2:text-3xl">
            {fisioahoraResponsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 text-cvs-darkBlue">•</span>
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tecnologías */}
      <h2 className="text-center text-lg uppercase text-defaultText xl2:text-4xl">
        {t("technologies")}
      </h2>

      <div className="mx-16 flex flex-col gap-2 rounded-2xl bg-cvs-darkBlue px-4 py-4 xl2:gap-12">
        {/* Lenguajes */}
        <div className="mx-8 flex flex-col gap-2 rounded-2xl bg-whiteText p-4 text-defaultText">
          <h3 className="text-center text-lg xl2:text-3xl">
            Languages
          </h3>

          <div className="flex flex-wrap justify-center gap-1">
            {languages.map((language) => (
              <span
                key={language}
                className="rounded-lg border-2 border-cvs-darkBlue bg-whiteText px-3 py-1 text-defaultText"
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        {/* Frameworks */}
        <div className="mx-8 flex flex-col gap-2 rounded-2xl bg-whiteText p-4 text-defaultText">
          <h3 className="text-center text-lg xl2:text-3xl">
            Frameworks
          </h3>

          <div className="flex flex-wrap justify-center gap-1">
            {frameworks.map((framework) => (
              <span
                key={framework}
                className="rounded-lg border-2 border-cvs-darkBlue bg-whiteTextText px-3 py-1 text-defaultText"
              >
                {framework}
              </span>
            ))}
          </div>
        </div>

        {/* Bases de datos */}
        <div className="mx-8 flex flex-col gap-2 rounded-2xl bg-whiteText p-4 text-defaultText">
          <h3 className="text-center text-lg xl2:text-3xl">
            Databases
          </h3>

          <div className="flex flex-wrap justify-center gap-1">
            {databases.map((database) => (
              <span
                key={database}
                className="rounded-lg border-2 border-cvs-darkBlue bg-whiteTextText px-3 py-1 text-defaultText"
              >
                {database}
              </span>
            ))}
          </div>
        </div>

        {/* Herramientas */}
        <div className="mx-8 flex flex-col gap-2 rounded-2xl bg-whiteText p-4 text-defaultText">
          <h3 className="text-center text-lg xl2:text-3xl">
            Tools
          </h3>

          <div className="flex flex-wrap justify-center gap-1">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-lg border-2 border-cvs-darkBlue bg-whiteTextText px-3 py-1 text-defaultText"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Herramientas de desarrollo API */}
        <div className="mx-8 flex flex-col gap-2 rounded-2xl bg-whiteText p-4 text-defaultText">
          <h3 className="text-center text-lg xl2:text-3xl">
            Development API Tools
          </h3>

          <div className="flex flex-wrap justify-center gap-1">
            {devApiTools.map((tool) => (
              <span
                key={tool}
                className="rounded-lg border-2 border-cvs-darkBlue bg-whiteTextText px-3 py-1 text-defaultText"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}