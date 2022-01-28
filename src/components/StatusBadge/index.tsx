import React from 'react'
import { IStatus } from '../../types/application'

type Props = {
  status: IStatus
}

const StatusBadge: React.FC<Props> = ({ status }) => {
  const getColor = {
    waiting: 'text-yellow-500',
    rejected: 'text-red-500',
    solved: 'text-green-500',
  }

  return (
    <span
      className={`p-1 text-sm ${getColor[status]}`}
      data-testid="status-badge"
    >
      {status}
    </span>
  )
}

export default StatusBadge
