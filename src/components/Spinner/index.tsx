import React from 'react'

type Props = {
  size: 'sm' | 'md' | 'xl'
}

const Spinner: React.FC<Props> = ({ size }) => {
  const getSize = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    xl: 'w-9 h-9',
  }

  return (
    <span
      className={`border-white border-2 rounded-full inline-block
      animate-spin border-t-transparent ${getSize[size]}`}
      data-testid="spinner"
    />
  )
}

export default Spinner
