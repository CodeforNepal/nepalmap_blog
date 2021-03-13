export const Button:React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {submitting?:boolean}> = (props) => {
    const {children,submitting,...rest} = props
    return(
        <button {...rest} className="disabled:opacity-70 w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">{submitting ? 'Please wait...':children}</button>
    )
}