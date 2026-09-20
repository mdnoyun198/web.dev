import PasswordResetWrapper from "@/components/auth/password.reset/PasswordResetWrapper"


function page() {
  return (
    <main className="w-full max-w-(--max-width) mx-auto md:px-4 flex flex-col items-center py-6 ">
      <PasswordResetWrapper />
    </main>
  )
}

export default page
