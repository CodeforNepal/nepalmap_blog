import { ComponentType } from 'react'
import { Field, FieldInputProps,FormRenderProps } from 'react-final-form'
import MarkdownEditor, {MarkdownProps} from '../markdown-editor'

export interface InputProps<T=any> extends React.DetailedHTMLProps<React.InputHTMLAttributes<T>, T> {
    name: string;
    label?: string;
}

type InputType<T=any> = Omit<InputProps<T>,'label'> & FieldInputProps<any,HTMLElement>

const InputRaw: React.FC<InputType<HTMLInputElement>> = (props) => (<input {...props} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />)
const TextAreaRaw: React.FC<InputType<HTMLTextAreaElement>> = (props) => (<textarea {...props} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />)

const inputComponents: {[type:string]:ComponentType<InputType> | ComponentType<MarkdownProps>} = {
    text: InputRaw,
    textarea: TextAreaRaw,
    markdown: MarkdownEditor,
}

export const Input: React.FC<InputProps & {formProps:FormRenderProps<any>}> = (props) => {
    const { name, required,label,formProps, ...rest } = props;
    const {change} = formProps.form
    const Component = inputComponents[props.type || 'text']
    return (
        <Field name={name} validate={required ? (value) => (!value || !value.trim() ? 'Required' : undefined) : undefined}>
            {({ input, meta }) => (
                <div className="mb-6">
                {label && <label htmlFor={rest.id || name} className="block mb-2 text-sm text-gray-600 dark:text-gray-400">{label}</label>}
                {Component && <Component {...rest} {...input} handleChange={change} />} {/** handleChange is used by markdown only */}
                {meta.touched && meta.error && <span className="text-red-400 text-xs">{meta.error}</span>}
                
                </div>
            )}
        </Field>
    )
}


