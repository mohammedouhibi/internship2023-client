import React from 'react'
import './profile-tray.css'
export default function ProfileTray(props) {
  return (
    
    <div className='profile-tray-box shadow'>
        <div className='profile-tray-link-list'>
            <h6 className='profile-tray-header'>{props.username()}</h6>
        <div className='profile-tray-link'>
            Edit profile
            </div>
            <div className='profile-tray-link' onClick={() => (window.location.href = "/purchase-history")}>
            Purchase history
            </div>
        </div>
        <div className='profile-tray-logout profile-tray-link ' onClick={props.logout}>
            Logout
        </div>
    </div>
  )
}
