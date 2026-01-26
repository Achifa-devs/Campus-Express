import React from 'react'

export default function SettingsAside() {
  return (
    <>
      <div className="settings-aside">
      <h6 style={{color: 'orangered'}}><b><u>Settings</u></b></h6>
      <br />
        <ul>
            {
                ['Billing/Payments', 'Password/Security', 'Identify Verification', 'Contact Info', 'Notification Settings'].map(item => <li>{item}</li>)
            }
        </ul>
      </div>
    </>
  )
}
