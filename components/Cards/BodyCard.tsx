import React, { ReactElement } from 'react'

const BodyCard = ({children}: {children: React.JSX.Element}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      {children}
  </div>
  )
}

export default BodyCard
