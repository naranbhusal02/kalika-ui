import React from "react";
import { SiteFooter } from "./site-footer";
import { SuccessStoryCarousel } from "./success-story-carousel";
const footer = () => {
  return (
    <div className="w-screen h-screen">
      <SuccessStoryCarousel></SuccessStoryCarousel>

      <SiteFooter></SiteFooter>
    </div>
  );
};

export default footer;
