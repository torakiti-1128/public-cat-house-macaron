import React from "react";
import conceptData from "../data/concept.json";
import Button from "./common/Button";

export const Concept: React.FC = () => {
  return (
    <section className="text-gray-600 body-font mt-10">
      <div className="w-full bg-cover bg-center">
        <div className="container px-5 py- mx-auto flex flex-col">
          <div className="mx-auto">
            <div className="rounded-lg h-100 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src={conceptData.image}
              />
            </div>
            <div className="relative flex flex-col sm:flex-row mt-5">
              <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                  className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="pattern-id"
                      width="200"
                      height="200"
                      x="50%"
                      y="-1"
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M100 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#pattern-id)" />
                </svg>
              </div>
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-40 h-40 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400 mt-5 sm:mt-0">
                  <img
                    alt="logo"
                    className="object-cover object-center h-full w-full shadow-xl"
                    src={conceptData.logo}
                  />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2
                    className="font-medium title-font mt-4 text-gray-900 text-xl"
                    style={{ fontFamily: "Paratino, serif" }}
                  >
                    {conceptData.about.title}
                  </h2>
                  <div className="w-20 h-1 bg-[#EDDFE0] rounded mt-2 mb-10"></div>
                  <p
                    className="text-sm"
                    style={{ fontFamily: "Paratino, serif" }}
                  >
                    {conceptData.about.description}
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 mt-4 pt-4 sm:mt-0 text-center sm:text-center">
                <h2
                  className="font-bold text-xl sm:text-xl md:text-xl lg:text-cl text-black mb-5 text-left"
                  style={{ fontFamily: "Paratino, serif" }}
                >
                  {conceptData.macaronMeaning.title}
                </h2>
                <p
                  className="leading-relaxed text-base mb-4 px-3 text-left"
                  style={{ fontFamily: "Paratino, serif" }}
                >
                  {conceptData.macaronMeaning.content.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
                <h2
                  className="font-bold text-xl sm:text-xl md:text-xl lg:text-xl text-black mb-5 text-left"
                  style={{ fontFamily: "Paratino, serif" }}
                >
                  {conceptData.concept.title}
                </h2>
                <p
                  className="leading-relaxed text-base mb-4 px-5 text-left"
                  style={{ fontFamily: "Paratino, serif" }}
                >
                  {conceptData.concept.content.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
                <Button
                text={conceptData.aboutButton.text}
                link={conceptData.aboutButton.link}
                icon={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};