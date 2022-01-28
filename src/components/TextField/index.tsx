import { FieldHookConfig, useField } from 'formik'
import React from 'react'
import TextArea from 'react-textarea-autosize'

interface Props {
  label: string
}

const TextField: React.FC<Props & FieldHookConfig<string>> = ({
  type,
  label,
  ...props
}) => {
  const [field, meta] = useField(props)

  const className = `p-2 outline-none border w-full rounded-lg mt-2 resize-none
  text-black placeholder:text-gray-600 appearance-none bg-transparent ${
    meta.touched && meta.error
      ? 'border-red-500 focus:border-red-500'
      : 'border-black'
  }`

  return (
    <label htmlFor={props.id}>
      {label}
      {type === 'textarea' ? (
        <TextArea
          {...field}
          id={props.id}
          placeholder={props.placeholder}
          minRows={2}
          className={className}
          data-testid="textarea"
        />
      ) : (
        <input
          {...field}
          id={props.id}
          type={type}
          placeholder={props.placeholder}
          className={className}
          data-testid="input"
        />
      )}
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-500 font-semibold">{meta.error}</p>
      )}
    </label>
  )
}

export default TextField
