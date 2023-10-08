"use client"
import React, { useEffect, useState } from 'react';
import styles from './writePage.module.css'
import Image from 'next/image';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.bubble.css"
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '@/utills/firebse';



const storage = getStorage(app);

const WritePage = () => {

    const [open, setOpen] = useState(false)
    const [file, setFile] = useState(null)
    const [media, setMedia] = useState("")
    const [value, setValue] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        const upload = () => {
            const name = new Date().getTime + file.name
            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    console.log(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setMedia(downloadURL)
                    });
                }
            );
        }

        file && upload()
    }, [file])


    const { status } = useSession()
    const router = useRouter()
    // console.log(data, status);
    if (status === 'loading') {
        return <div className={styles.loading}>Loading...</div>
    }
    if (status === 'unauthenticated') {
        router.push('/')
    }


    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+s/g, "");


    const handleSubmit = async () => {
        const res = await fetch("/api/posts", {
            method: 'POST',
            body: JSON.stringify({
                title,
                desc: value,
                img: media,
                slug: slugify(title),
                catSlug: "travel",
            })
        })
        console.log(res);
    }


    return (
        <div className={styles.container}>
            <input type="text" className={styles.input} placeholder='Title here...' onChange={e => setTitle(e.target.value)} />



            <div className={styles.editor}>
                <button className={styles.button} onClick={() => setOpen(!open)}>
                    <Image src="/plus.png" alt='img' width={16} height={16} />
                </button>
                {
                    open && <div className={styles.add}>
                        <input type="file" id='image' onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />
                        <label htmlFor="image">
                            <div className={styles.addButton}>
                                <Image src="/image.png" alt='img' width={16} height={16} />
                            </div>
                        </label>
                        <div className={styles.addButton}>
                            <Image src="/external.png" alt='img' width={16} height={16} />
                        </div>
                        <div className={styles.addButton}>
                            <Image src="/video.png" alt='img' width={16} height={16} />
                        </div>
                    </div>
                }
                <ReactQuill
                    className={styles.textArea}
                    theme="bubble"
                    value={value}
                    onChange={setValue}
                    placeholder="Tell your story..."
                />
            </div>
            <button className={styles.publish} onClick={handleSubmit}>Publish</button>
        </div>
    );
};

export default WritePage;