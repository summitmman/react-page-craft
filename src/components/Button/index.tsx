import { PropsWithChildren } from "react"
import styles from './Button.module.css';

const Button = ({ children, className = '', ...props }: PropsWithChildren & Record<string, any>) => {
    console.log('button rendered');
    return (
        <button className={`${styles.btn} ${styles['btn-primary']} ${className}`} {...props}>{children}</button>
    )
}

export default Button