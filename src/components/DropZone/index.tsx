import React from 'react'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'

interface Props {
  onDrop: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void | undefined
  accept: string | string[]
  maxFiles: number
}

const DropZone: React.FC<Props> = ({ onDrop, accept, maxFiles }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
  })

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-2 border-black rounded-md p-3 h-28 flex items-center justify-center cursor-pointer"
      data-testid="dropzone-input"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  )
}

export default DropZone
