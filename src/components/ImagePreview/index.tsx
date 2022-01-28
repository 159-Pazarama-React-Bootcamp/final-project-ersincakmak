import React, { useState } from 'react'
import Modal from 'react-modal'
import { FaTimes } from 'react-icons/fa'

interface Props {
  file: File
  onDelete: ((name: string) => void) | false
}

const ImagePreview: React.FC<Props> = ({ file, onDelete }) => {
  const [open, setOpen] = useState(false)

  const closeModal = () => {
    setOpen(false)
  }

  const openModal = () => {
    setOpen(true)
  }

  return (
    <>
      <div
        role="contentinfo"
        data-testid="image-modal-text"
        onClick={openModal}
        className="border-2 border-stone-300 hover:border-stone-500 cursor-pointer transition w-max max-w-full
        text-ellipsis p-3 rounded-md flex items-center justify-center relative"
      >
        {!!onDelete && (
          <button
            type="button"
            className="absolute -right-2 -top-2 p-1 bg-red-400 rounded-md text-sm hover:bg-red-500"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(file.name)
            }}
            data-testid="delete-button"
          >
            <FaTimes />
          </button>
        )}
        {file.name}
      </div>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        className="p-0 absolute top-0 left-0 right-0 bottom-0 max-w-full w-max m-auto h-full max-h-72 px-3"
        ariaHideApp={false}
      >
        <button
          type="button"
          className="ml-auto text-xl absolute top-0 transform -translate-y-full right-0 p-2"
          onClick={closeModal}
        >
          <FaTimes />
        </button>
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="w-full h-full object-contain"
          data-testid="image-modal"
        />
      </Modal>
    </>
  )
}

export default ImagePreview
