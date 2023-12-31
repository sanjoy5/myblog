"use client"

import React, { useState } from 'react';
import styles from './comments.module.css'
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    if (!res.ok) {
        const error = new Error(data.message)
        throw error
    }

    return data
}

const Comments = ({ postSlug }) => {
    const { status } = useSession()

    const { data, mutate, isLoading } = useSWR(`http://localhost:3000/api/comments?postSlug=${postSlug}`, fetcher)

    const [desc, setDesc] = useState("")

    const handleSubmit = async () => {
        await fetch("http://localhost:3000/api/comments", {
            method: "POST",
            body: JSON.stringify({ desc, postSlug })
        })
        mutate()
    }


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Comments</h1>
            {
                status === "authenticated" ? (
                    <div className={styles.write}>
                        <textarea name="" placeholder="write a comment" onChange={e => setDesc(e.target.value)} className={styles.input} ></textarea>
                        <button className={styles.button} onClick={handleSubmit}>Send</button>
                    </div>
                ) : (
                    <Link href='/login'>Login to write a comment.</Link>
                )
            }


            <div className={styles.comments}>
                {isLoading ? "Loading..." : data?.map(item => (

                    <div className={styles.comment} key={item._id}>
                        <div className={styles.user}>
                            {item?.user?.image && <Image src={item.user.image} height={50} width={50} className={styles.image} alt='' />}
                            <div className={styles.userInfo}>
                                <span className={styles.username}>{item.user.name}</span>
                                <span className={styles.date}>{item.createdAt}</span>
                            </div>
                        </div>
                        <div className={styles.desc}>
                            {item.desc}
                        </div>

                    </div>
                ))}
            </div>


        </div>
    );
};

export default Comments;