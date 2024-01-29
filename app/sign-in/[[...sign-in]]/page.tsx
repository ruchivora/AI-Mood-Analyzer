import {SignIn} from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className='flex justify-center text-center items-center h-screen'>
      <SignIn />
    </div>
  )
}

export default SignInPage;
