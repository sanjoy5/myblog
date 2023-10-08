import React from 'react';
import styles from './featured.module.css';
import Image from 'next/image';

const Featured = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}><b> Hey, Sanjoy Sarker here! </b> Discover my stories and creative ideas.</h1>

            <div className={styles.post}>
                <div className={styles.imgContainer}>
                    <Image src='/p1.jpeg' alt='post' fill className={styles.image} />
                </div>
                <div className={styles.textContainer}>
                    <h1 className={styles.postTitle}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus, rem.</h1>
                    <p className={styles.postDesc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, quibusdam tempora? Quasi, libero nihil aut consequatur praesentium soluta cum rerum placeat tempore ipsum et? Eligendi odit consequatur quisquam ducimus ipsa?</p>
                    <button className={styles.button}>Read More</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;