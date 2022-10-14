// Modal in Next.js

import React, { useEffect, useRef } from "react";

export function Modal(props: {
    children: React.ReactNode;
    onClose: () => void;
    show: boolean;
    }) {
    const modalRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            props.onClose();
        }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props]);
    
    return (
        <div
        className={`modal ${props.show ? "modal--show" : "modal--hide"}`}
        ref={modalRef}
        style={{
            position: "fixed",
            top: "55%",
            left: "35%",
            width: "30%",
            height: "25%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            borderRadius: "50px",
        }}
        >
        {props.children}
        </div>
    );
    }

