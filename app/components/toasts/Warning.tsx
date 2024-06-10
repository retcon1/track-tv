import React from 'react'

interface RemovedProps {
  text: string;
}

const Warning = ({text}: RemovedProps) => {
  return (
    <div className="toast toast-end toast-top z-50">
    <div className="alert alert-warning">
      <span>{text}</span>
    </div>
  </div>
  )
}

export default Warning