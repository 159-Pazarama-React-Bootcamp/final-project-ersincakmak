import React from 'react'

type Props = {
  title: string
}

const FieldDisplay: React.FC<Props> = ({ title, children }) => (
  <div className="w-full flex flex-col items-start md:flex-row md:items-center gap-2">
    <p className="text-lg font-semibold self-start">{title}:</p>
    <div>{children}</div>
  </div>
)

export default FieldDisplay
