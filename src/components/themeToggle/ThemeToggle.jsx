"use client"

import React from 'react';
import styles from './themeToggle.module.css'
import Image from 'next/image';
import { useThemecontext } from '@/context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggle } = useThemecontext()
    console.log(theme);
    return (
        <div className={styles.container} onClick={toggle}
            style={
                theme === 'dark'
                    ? { background: "white" }
                    : { background: "#0f172a" }
            }>
            <Image src="/moon.png" alt='moon' width={16} height={16} />

            <div className={styles.ball}
                style={
                    theme === 'dark'
                        ? { left: 1, background: "#0f172a" }
                        : { right: 1, background: "white" }
                }></div>

            <Image src="/sun.png" alt='sun' width={16} height={16} />
        </div>
    );
};

export default ThemeToggle;