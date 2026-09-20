import LoginForm from "@/components/auth/login/LoginForm"
import { Suspense } from 'react';

function page() {
  return (
  <main className="w-full max-w-(--max-width) mx-auto md:px-4 flex flex-col items-center py-6 ">

      <Suspense fallback={<p>Loading login...</p>}>
        <LoginForm />
      </Suspense>
    </main>
  )
}

export default page
