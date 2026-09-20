'use client'

import { useState } from "react"
import EmailForm from "./EmailForm"
import PasswordForm from "./PasswordForm"
import OtpForm from "./OtpForm"

const PasswordResetWrapper = () => {
  const [step, setStep] = useState<'email' | 'password' | 'otp'>('email')
  const [email, setEmail] = useState("");

  return (
    <>
      {step === 'email' && <EmailForm setStep={setStep} setGlobalEmail={setEmail} />}
      {step === 'password' && <PasswordForm email={email} setStep={setStep} />}
      {step === 'otp' && <OtpForm email={email} />}
    </>
  )
}

export default PasswordResetWrapper