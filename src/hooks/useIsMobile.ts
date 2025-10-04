import {useEffect, useState} from "react";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 768;
        }
        return false;
    });

    useEffect(() => {
        const checkIsMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(prev => prev !== mobile ? mobile : prev);
        };

        // Add debounce to prevent excessive re-renders
        // @ts-ignore
        let timeoutId: NodeJS.Timeout;
        const debouncedCheck = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkIsMobile, 100);
        };

        window.addEventListener('resize', debouncedCheck);
        return () => {
            window.removeEventListener('resize', debouncedCheck);
            clearTimeout(timeoutId);
        };
    }, []);

    return isMobile;
}

export default useIsMobile;