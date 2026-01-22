import React from 'react'

export default function University({userData}) {
  return (
    <>
      <div className="seller-profile-education">
        <div><b>University</b></div>
        <div>{userData?.campus},{userData?.state}</div>
      </div>
    </>
  )
}
