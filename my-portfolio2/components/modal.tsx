import React, { useRef, useState } from "react";

type ModalProps = {
  title: string;
  onMinimize: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({
  title,
  onMinimize,
  onClose,
  children,
}: ModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Función para iniciar el movimiento (mouse)
  const startDragging = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - (modalRef.current?.offsetLeft ?? 0),
      y: e.clientY - (modalRef.current?.offsetTop ?? 0),
    });
  };

  // Función para iniciar el movimiento (touch)
  const startTouchDragging = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];

    setOffset({
      x: touch.clientX - (modalRef.current?.offsetLeft ?? 0),
      y: touch.clientY - (modalRef.current?.offsetTop ?? 0),
    });
  };

  // Función para manejar el movimiento del mouse
  const onMouseMove = (e: MouseEvent) => {
    if (isDragging && modalRef.current) {
      modalRef.current.style.left = `${e.clientX - offset.x}px`;
      modalRef.current.style.top = `${e.clientY - offset.y}px`;
    }
  };

  // Función para manejar el movimiento táctil
  const onTouchMove = (e: TouchEvent) => {
    if (isDragging && modalRef.current) {
      const touch = e.touches[0];

      modalRef.current.style.left = `${touch.clientX - offset.x}px`;
      modalRef.current.style.top = `${touch.clientY - offset.y}px`;
      e.preventDefault(); 
    }
  };

  // Función para detener el arrastre
  const stopDragging = () => {
    setIsDragging(false);
  };

  // Añadir y eliminar los eventos de mouse y touch
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", stopDragging);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", stopDragging);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDragging);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging, offset]);

  return (
    <div
      ref={modalRef}
      className="fixed top-20 left-20 w-[60%] min-h-[30%] max-h-[90vh] lg:w-[40%] bg-white border-4 border-cvs-lightBlue rounded-lg z-30 overflow-hidden
               data-[state=open]:animate-in data-[state=closed]:animate-out
               data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
               data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2
               duration-300"
      data-state="open"
    >
      <div
        className="w-full h-10 bg-cvs-lightBlue flex justify-between items-center px-4"
        onMouseDown={startDragging}
        onTouchStart={startTouchDragging}
      >
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        <div className="flex space-x-2">
          <button onClick={onMinimize}>
            <img alt="Minimize Icon" className="w-8 h-8" src="/min.svg" />
          </button>
          <button onClick={onClose}>
            <img alt="Close Icon" className="w-8 h-8" src="/close.svg" />
          </button>
        </div>
      </div>
      <div className="p-4 overflow-y-auto max-h-[calc(85vh-2.5rem)] custom-scrollbar">
        {children}
      </div>
    </div>
  );
}
