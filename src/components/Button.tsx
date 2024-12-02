import { PropsWithChildren } from "react"

const Button = ({ children, ...props }: PropsWithChildren & Record<string, any>) => {
    return (
        <button className="btn btn-primary" {...props}>{children}</button>
    )
}

export default Button