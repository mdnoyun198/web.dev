export function otpMail(name, otp) {
  return {
    subject: "Email Verification",

    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px">

        <h2>Email Verification to reset your password</h2>

        <p>Hello <b>${name}</b>,</p>

        <p>Your verification code is:</p>

        <div style="font-size:32px;font-weight:bold;text-align:center;letter-spacing:6px;background:#f4f4f4;padding:20px;border-radius:8px;">
          ${otp}
        </div>

        <p>
          This OTP will expire in
          <b>15 minutes</b>.
        </p>

        <p>
          If you didn't request this verification,
          please ignore this email.
        </p>

      </div>
    `,
  };
}