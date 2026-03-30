import s from "./Section.module.scss";
import React from "react";
import clsx from "clsx";

interface sectionProp {
  children: React.ReactNode;
  className?: string;
  w?: string;
  h?: string;
}

export default function Section({children, className, w, h}:sectionProp) {
  return (
    <div 
      className={clsx(s.section, className)}
      style={{width: w ? w : "100%", height: h ? h : "100%"}}
    >{children}</div>
  )
}