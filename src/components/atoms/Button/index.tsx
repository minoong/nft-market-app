interface ButtonProps {
 text: string
}

function Button(props: ButtonProps) {
 const { text } = props
 return <div>{text}</div>
}

export default Button
