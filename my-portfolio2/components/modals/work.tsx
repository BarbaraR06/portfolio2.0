import React from "react";

export default function WorkModal() {
  return (
    <div className="text-defaultText font-bold flex flex-col gap-4">
      <div className="flex flex-col gap-1 border-2 border-cvs-lightBlue rounded-lg p-4 w-[90%] xl2:gap-6">
        <h3 className="text-cvs-darkBlue text-lg xl2:text-4xl">
          Frontend Developer
        </h3>
        <p className="xl2:text-3xl font-bold">
          <a
            className="text-cvs-lightBlue hover:text-cvs-pink transition-colors"
            href="https://www.opengrano.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Opengrano
          </a>{" "}
          - Web3 Platform | Open source project on{" "}
          <a
            className="text-cvs-lightBlue hover:text-cvs-pink transition-colors"
            href="https://www.thebadge.xyz/"
            rel="noopener noreferrer"
            target="_blank"
          >
            TheBadge
          </a>{" "}
          (December 2023 - present)
        </p>
        <ul className="list-none space-y-2 xl2:text-3xl">
          <li className="flex items-start">
            <span className="text-cvs-lightBlue mr-2">•</span>
            <span>
              Design and develop reusable frontend components using React,
              Next.js, TailwindCSS, and TypeScript.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-cvs-lightBlue mr-2">•</span>
            <span>Configure translations in multiple languages with i18n.</span>
          </li>
          <li className="flex items-start">
            <span className="text-cvs-lightBlue mr-2">•</span>
            <span>
              Design the website&apos;s interface in Figma and then implement it
              on the frontend, ensuring visual consistency.
            </span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-1 border-2 border-cvs-lightBlue rounded-lg p-4 w-[90%] xl2:gap-6">
        <h3 className="text-cvs-darkBlue text-lg xl2:text-4xl">
          Frontend Developer
        </h3>
        <p className="xl2:text-3xl">
          FisioAhora - Internship at{" "}
          <a
            className="text-cvs-lightBlue hover:text-cvs-pink transition-colors"
            href="https://www.linkedin.com/company/footalentgroup/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Foo Talent Group
          </a>{" "}
          (February 2024 - March 2024)
        </p>
        <ul className="list-none space-y-2 xl2:text-3xl">
          <li className="flex items-start">
            <span className="text-cvs-lightBlue mr-2">•</span>
            <span>
              Design and build attractive and functional FisioAhora frontend
              components and pages using React, TailwindCSS, and JavaScript
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-cvs-lightBlue mr-2">•</span>
            <span>
              Developing search functionality with filters using Node.js
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-cvs-lightBlue mr-2">•</span>
            <span>Deploying and configuring the application deployment</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
