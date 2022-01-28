import React from 'react'

type Props = {
  className?: string
}

const FieldWrapper: React.FC<Props> = ({ children, className }) => (
  <div
    className={`p-3 bg-white rounded-xl border-2 border-slate-300 shadow-md ${className}`}
  >
    {children}
  </div>
)

export default FieldWrapper

FieldWrapper.defaultProps = {
  className: '',
}
