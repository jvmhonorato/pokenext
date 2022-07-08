import Image from 'next/image'
import styles from '../styles/About.module.css'

export default function About() {
    return (
        <div className={styles.about}>
            <h1>About</h1>
            <p>Parágrafo About</p>
            <Image src="/images/charizard.png" width="300" height="300"   alt="Char" />
        </div>
        )
}