import React from "react";

export default function EducationModal() {
  return (
    <div className="text-defaultText font-bold flex flex-col gap-4">
      <div className="flex flex-col gap-1 border-2 border-cvs-lightBlue rounded-lg p-4 w-[90%] md:w-1/2 xl2:gap-6 xl2:w-2/3">
        <h3 className="text-cvs-darkBlue text-lg xl2:text-4xl">
          Degree in Computer Science Applied to Multimedia and Website Design
        </h3>
        <p className="xl2:text-3xl">
          {" "}
          Universidad Nacional Del Litoral (2025-present)
        </p>
      </div>

      <div className="flex flex-col gap-1 border-2 border-cvs-lightBlue rounded-lg p-4 w-[90%] md:w-1/2 xl2:gap-6 xl2:w-2/3">
        <h3 className="text-cvs-darkBlue text-lg xl2:text-4xl">
        <p>Bachelor&apos;s degree in Industrial Design</p>
        </h3>
        <p className="xl2:text-3xl">
          {" "}
          Universidad Nacional Del Litoral (2015-present)
        </p>
      </div>
    </div>
  );
}
