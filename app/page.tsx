import Link from "next/link";
import {auth} from '@clerk/nextjs'

export default async function Home() {
  const {userId} =  await auth()

  let href =  (userId) ? '/journal' : '/new-user'

  return (
    <div className="w-screen h-screen bg-neutral-900 flex justify-center items-center text-white">
      <div className="max-w-[700px] mx-auto w-full">
        <h1 className="text-6xl mb-4">The Best Journal App</h1>
        <p className="text-xl text-white/60 my-2">
          Discover the ultimate mood-tracking app, designed to accompany you throughout your life journey.
        </p>
        <p className="text-xl text-white/60 my-2">
          Simply embrace honesty, and let the app seamlessly capture the nuances of your mood.
        </p>
        <div className="my-3">
          <Link href={href}>
          <button className="bg-blue-600 px-4 py-3 rounded-2xl text-xl">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
