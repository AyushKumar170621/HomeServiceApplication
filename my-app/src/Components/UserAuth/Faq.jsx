import React from 'react'
import "./profile.css"
const Faq = () => {
  return (
    <div className="col faq bg-light">
    <h3>FAQs</h3>
        <br />

        <p>
          <sub>
            <b>
              What happens when I update my email address (or mobile number)?
              <br />
            </b>
            Your login email id (or mobile number) changes, likewise. You'll
            receive all your account related communication on your updated
            email address (or mobile number).
            <br />
            <br />
            <b>
              When will my account be updated with the new email address (or
              mobile number)?
              <br />
            </b>
            It happens as soon as you confirm the verification code sent to
            your email (or mobile) and save the changes.
            <br />
            <br />
            <b>
              What happens to my existing account when I update my email
              address (or mobile number)?
              <br />
            </b>
            Updating your email address (or mobile number) doesn't invalidate
            your account. Your account remains fully functional. You'll
            continue seeing your Order history, saved information and personal
            details.
          </sub>
        </p>
    </div>
  )
}

export default Faq