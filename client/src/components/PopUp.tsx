import  { ReactNode, useState } from "react";
import style from "./PopUp.module.css";

export default function PopUp({
  isOpen,
  children,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  children : ReactNode
}) {
  
  return (
    isOpen && (
      <div className={style.container} onClick={onClose}>
        {children}
      </div>
    )
  );
}
