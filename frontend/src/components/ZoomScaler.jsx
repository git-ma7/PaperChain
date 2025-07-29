import { useEffect } from "react";

const ZoomScaler = () => {
    useEffect(() => {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const deviceScale = window.devicePixelRatio;

        // Check if screen is larger than 1920x1080 and has 100% OS scaling
        const isLargeScreen = screenWidth > 1920 && screenHeight > 1080;
        const isDefaultScale = deviceScale === 1;

        // Safely access DOM elements
        const sidebar = document.getElementById("sidebar");
        const heroSections = document.getElementsByClassName("homesection");

        if (isLargeScreen && isDefaultScale) {
            document.body.style.zoom = "125%";

            if (sidebar) {
                sidebar.style.height = "73vh";
                sidebar.style.overflowY = "auto";
            }

            if (heroSections.length > 0) {
                for (let i = 0; i < heroSections.length; i++) {
                    heroSections[i].style.height = "73vh";
                    heroSections[i].style.overflowY = "auto";
                }
            }
        } else {
            document.body.style.zoom = "100%";

            if (sidebar) {
                sidebar.style.height = "100vh";
                sidebar.style.overflowY = "auto";
            }

            if (heroSections.length > 0) {
                for (let i = 0; i < heroSections.length; i++) {
                    heroSections[i].style.height = "100vh";
                    heroSections[i].style.overflowY = "auto";
                }
            }
        }
    }, []);

    return null;
};

export default ZoomScaler;
