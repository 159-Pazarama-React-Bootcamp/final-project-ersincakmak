import React from 'react'
import { IApplication } from '../../types/application'
import FieldDisplay from '../FieldDisplay'
import StatusBadge from '../StatusBadge'

type Props = {
  application: IApplication
}

const ApplicationDetail: React.FC<Props> = ({ application }) => (
  <div className="p-3 rounded-xl border-2 border-slate-300 bg-white flex flex-col gap-3">
    <p className="text-2xl font-bold text-center">Application Detail</p>
    <FieldDisplay title="Status">
      <StatusBadge status={application?.status} />
    </FieldDisplay>
    <FieldDisplay title="First Name">{application?.firstName}</FieldDisplay>
    <FieldDisplay title="Last Name">{application?.lastName}</FieldDisplay>
    <FieldDisplay title="Age">{application?.age}</FieldDisplay>
    <FieldDisplay title="Tc No">{application?.tcNo}</FieldDisplay>
    <FieldDisplay title="Address">{application?.address}</FieldDisplay>
    <FieldDisplay title="Application Reason">
      {application?.applicationReason}
    </FieldDisplay>
    <FieldDisplay title="Files">
      <div className="flex gap-2 flex-wrap">
        {application.files.length < 1
          ? 'There is no files'
          : application.files.map((item, index) => (
              <a
                href={`${process.env.REACT_APP_API_URL}uploads/${item}`}
                target="_blank"
                key={item}
                rel="noreferrer"
                className="text-blue-400 underline"
              >
                image_{index}
              </a>
            ))}
      </div>
    </FieldDisplay>
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-lg">Answers</p>
      <div className="flex flex-col gap-2">
        {application.answers.length < 1
          ? 'There is no answer'
          : application.answers.map((item) => (
              <div key={item._id}>
                <p className="font-semibold text-orange-600">
                  @{item.author?.username}
                </p>
                <p className="text-sm">{item.message}</p>
              </div>
            ))}
      </div>
    </div>
  </div>
)

export default ApplicationDetail
