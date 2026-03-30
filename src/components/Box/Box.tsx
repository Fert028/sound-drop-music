import s from "./Box.module.scss";
import React from "react";
import clsx from "clsx";

interface boxProp {
  children?: React.ReactNode;
  className?: string;
  w?: string;
  h?: string;
}

export default function Box({children, className, w, h}:boxProp) {
  return (
    <div 
      className={clsx(s.box, className)}
      style={{width: w ? w : "100%", height: h ? h : "100%"}}
    >{children}</div>
  )
}