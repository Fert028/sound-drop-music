import s from "./Section.module.scss";
import React from "react";
import clsx from "clsx";

interface sectionProp {
  children: React.ReactNode;
  className?: string;
  w?: string;
  h?: string;
}

export default function Section({children, className, w = "100%", h = "100%"}:sectionProp) {
  return (
    <div 
      className={clsx(s.section, className)}
      style={{width: w, height: h}}
    >{children}</div>
  )
}