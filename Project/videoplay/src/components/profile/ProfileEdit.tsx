import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { ArrowLeft, Camera, KeyRound, MapPin, Save, ShieldCheck, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
type SignupProps = {
  setOpenForm: (open: 'profile') => void;
};

type formDataProps = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

function ProfileEdit({ setOpenForm }: SignupProps) {

  const [formData, setFormData] = useState<formDataProps>({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const [message, setMessage] = useState<string | null>(null)

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    // Get values from form elements to handle autofill
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || formData.name;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || formData.email;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value || formData.phone;
    const address = (form.elements.namedItem('address') as HTMLTextAreaElement)?.value || formData.address;

    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, address, }),
      })

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || 'Something went wrong');
      }

    } catch (error) {
      console.log(error);
      setMessage('Server error. Please try again.');
    }
  }

  useEffect(() => {

    async function profileData() {

      try {
        const res = await fetch('/api/profile', {
          method: 'GET'
        });

        const json = await res.json();

        if (res.ok) {
          setFormData(json);
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    }
    profileData();
  }, []);




  async function imageUpload(e: React.ChangeEvent<HTMLInputElement>) {

    const file = e.target.files?.[0];

    if (!file) return;

    const uploadData = new FormData();

    uploadData.append('file', file);
    uploadData.append('type', 'profile')


    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!res.ok) {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  }



  return (
    <motion.div
      initial={{ opacity: 0, x: 1 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="min-h-full mx-auto w-full max-w-4xl  p-4 pt-2  sm:min-h-0 sm:rounded-2xl theme-border  sm:p-6 sm:pt-3 "
    >
      <div className="flex w-full items-center justify-between border-b border-neutral-400 dark:border-neutral-800  pb-4">
        <button
          onClick={() => setOpenForm('profile')}
          className="flex cursor-pointer flex-row items-center gap-2 rounded-lg px-1 py-1 text-sm font-medium  "
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

      </div>

      <div className="flex w-full items-center gap-4 py-4 sm:py-5">


        <div className="relative cursor-pointer">
          <label>
            <input
              onChange={imageUpload}
              type="file" className="hidden" />

            <div className="h-20 w-20 flex items-center justify-center rounded-full theme-border">
              <UserRound className="h-10 w-10" />
            </div>

            <div className="absolute bottom-0 right-0 p-1.5  rounded-full theme-border">
              <Camera className="h-3.5 w-3.5 " />
            </div>
          </label>
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-bold ">Account details</h2>
          <p className="mt-1 flex items-center gap-1.5 text-xs font-medium ">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
            <span>Keep your delivery info fresh</span>
            <span className='text-green-600 text-md'>{message}</span>
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid w-full gap-5 md:grid-cols-[1fr_1fr] md:items-start">
          <div className="flex flex-col gap-3.5 rounded-xl theme-border  p-4">

            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-medium text-neutral-500">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter Your full name"
                className=' rounded-lg'
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium text-neutral-500">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter Your Email"
                className=' rounded-lg'
              />
            </div>
            <button
              onClick={() => { router.push("password.reset") }}
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg theme-border  py-2.5 text-sm font-medium  cursor-pointer"
            >
              <KeyRound className="h-4 w-4" />
              Forgot Password?
            </button>

          </div>

          <div className="flex flex-col gap-3.5 rounded-xl theme-border p-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-xs font-medium text-neutral-500">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter Your phone"
                className=' rounded-lg'
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="address" className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                <MapPin className="h-3.5 w-3.5" />
                Delivery Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={6}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="House, Road, Block, City"
                className="max-h-25 rounded-lg"
              />
            </div>


          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            className="cursor-pointer w-full py-2.5 text-sm font-medium rounded-md theme-bg disabled:opacity-50 text-white flex items-center justify-center gap-5 max-w-100">

            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </form>

    </motion.div>
  )
}

export default ProfileEdit
