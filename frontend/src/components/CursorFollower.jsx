import React, { useState, useEffect } from "react";

const CursorFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setPosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            className="fixed -z-50 w-[300px] h-[300px] blur-3xl bg-[#44ff9f]/60 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                zIndex: -999,
            }}
        ></div>
    );
};

export default CursorFollower;
