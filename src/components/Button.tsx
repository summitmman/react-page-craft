import { PropsWithChildren } from "react"

const Button = ({ children, className = '', ...props }: PropsWithChildren & Record<string, any>) => {
    console.log('button rendered');
    return (
        <button className={"btn btn-primary " + className} {...props}>{children}</button>
    )
}

export default Button