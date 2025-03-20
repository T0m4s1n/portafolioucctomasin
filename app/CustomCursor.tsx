import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = ({ color = "accent", innerSize = 8, outerSize = 32 }) => {
    const [isHovering, setIsHovering] = useState(false);
    const setMousePosition = useState({ x: 0, y: 0 })[1];
    const isMoving = useRef(false);
    const moveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const innerX = useSpring(0, springConfig);
    const innerY = useSpring(0, springConfig);
    const outerX = useSpring(0, springConfig);
    const outerY = useSpring(0, springConfig);
    
    useEffect(() => {
        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);
        
        const addHoverListeners = () => {
            const interactiveElements = document.querySelectorAll(
                'a, button, input, select, textarea, [role="button"], [tabindex="0"]'
            );
            
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', handleHoverStart);
                element.addEventListener('mouseleave', handleHoverEnd);
            });
            
            return () => {
                interactiveElements.forEach(element => {
                    element.removeEventListener('mouseenter', handleHoverStart);
                    element.removeEventListener('mouseleave', handleHoverEnd);
                });
            };
        };
        
        const mouseMoveHandler = (e: MouseEvent) => {
            const x = e.clientX;
            const y = e.clientY;
            setMousePosition({ x, y });
            innerX.set(x - innerSize/2);
            innerY.set(y - innerSize/2);
            outerX.set(x - outerSize/2);
            outerY.set(y - outerSize/2);
            isMoving.current = true;
            if (moveTimeout.current) clearTimeout(moveTimeout.current);
            moveTimeout.current = setTimeout(() => {
                isMoving.current = false;
            }, 100);
        };
        
        window.addEventListener('mousemove', mouseMoveHandler);
        const cleanupHoverListeners = addHoverListeners();
        
        const observer = new MutationObserver(() => {
            cleanupHoverListeners();
            addHoverListeners();
        });
        
        observer.observe(document.body, { 
            childList: true, 
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });
        
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            cleanupHoverListeners();
            observer.disconnect();
            if (moveTimeout.current) clearTimeout(moveTimeout.current);
        };
    }, [innerSize, outerSize, innerX, innerY, outerX, outerY, setMousePosition]);

    return (
        <>
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: innerSize,
                    height: innerSize,
                    backgroundColor: `var(--${color})`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    x: innerX,
                    y: innerY,
                    mixBlendMode: 'difference'
                }}
            />
            
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: outerSize,
                    height: outerSize,
                    border: `1.5px solid var(--${color})`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    x: outerX,
                    y: outerY
                }}
                animate={{
                    scale: isHovering ? 1.4 : isMoving.current ? 0.8 : 1,
                    opacity: isHovering ? 0.8 : isMoving.current ? 0.6 : 0.35,
                }}
                transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 200
                }}
            />
        </>
    );
};

export default CustomCursor;
