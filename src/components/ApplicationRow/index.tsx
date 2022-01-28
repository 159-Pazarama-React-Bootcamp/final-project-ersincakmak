import React from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { IApplication } from '../../types/application'
import FieldWrapper from '../FieldWrapper'
import StatusBadge from '../StatusBadge'

type Props = {
  application: IApplication
}

const ApplicationRow: React.FC<Props> = ({ application }) => {
  const navigate = useNavigate()

  const handleViewClick = () => {
    navigate(`/admin/basvuru/${application._id}`)
  }

  return (
    <FieldWrapper className="flex items-center gap-2">
      <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
        {application.firstName} {application.lastName}
      </span>
      <span>
        <StatusBadge status={application.status} />
      </span>
      <span>{moment(application.createdAt).format('DD/MM/YYYY')}</span>
      <button
        type="button"
        onClick={handleViewClick}
        className="ml-2 py-1 px-2.5 bg-blue-300 rounded transition hover:bg-blue-400"
      >
        View
      </button>
    </FieldWrapper>
  )
}

export default ApplicationRow
