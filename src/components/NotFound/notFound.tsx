import React from 'react';
import cartIMG from '../../assets/img/idkpizza.png';
import styles from './notFound.module.scss'

const NotFound: React.FC<{text: string}> = ({text}) => {
    return (
        <div className={styles.notFound}>
            <h1>Not Found</h1>
            <img src={cartIMG} alt="NotFound" />
            <div>{text}</div>
        </div>
    )
}

export default NotFound;