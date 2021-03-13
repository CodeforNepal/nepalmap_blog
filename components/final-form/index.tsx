import { ComponentType } from 'react'
import { Field, FieldInputProps } from 'react-final-form'

export interface InputProps<T=any> extends React.DetailedHTMLProps<React.InputHTMLAttributes<T>, T> {
    name: string;
    label?: string;
}

type InputType<T=any> = Omit<InputProps<T>,'label'> & FieldInputProps<any,HTMLElement>

const InputRaw: React.FC<InputType<HTMLInputElement>> = (props) => (<input {...props} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />)
const TextAreaRaw: React.FC<InputType<HTMLTextAreaElement>> = (props) => (<textarea {...props} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />)
const Markdown: React.FC<InputType<HTMLTextAreaElement>> = (props) => (<textarea {...props} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />)

const inputComponents: {[type:string]:ComponentType<InputType>} = {
    text: InputRaw,
    textarea: TextAreaRaw,
    markdown: Markdown,a
}

export const Input: React.FC<InputProps> = (props) => {
    const { name, required,label, ...rest } = props;
    const Component = inputComponents[props.type || 'text']
    return (
        <Field name={name} validate={required ? (value) => (!value || !value.trim() ? 'Required' : undefined) : undefined}>
            {({ input, meta }) => (
                <div className="mb-6">
                {label && <label htmlFor={rest.id || name} className="block mb-2 text-sm text-gray-600 dark:text-gray-400">{label}</label>}
                {Component && <Component {...rest} {...input} />}
                {meta.touched && meta.error && <span>{meta.error}</span>}
                
                </div>
            )}
        </Field>
    )
}


