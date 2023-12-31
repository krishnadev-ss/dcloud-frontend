import React from 'react';
import styles from "./filetype-card.module.css";
import Image from "next/image";

const FiletypeCard = ({cl, url, src, name, count}) => {
    return (
        <button className={cl} onClick={() => router.push(url)}>
            <Image width={50} height={50} src={src} alt="Button Image"/>
            <div className={styles['filecategories-text']}>
                <p className={styles['filecategories-text-name']}>{name}</p>
                <p className={styles['filecategories-text-number']}>{count} files</p>
            </div>
        </button>
    );
}

export default FiletypeCard;
