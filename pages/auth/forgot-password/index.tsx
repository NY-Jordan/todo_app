import React from 'react'

export default function index() {
  return (
<div className="flex h-screen ">
 
  <div className="w-full bg-indigo-50 flex items-center justify-center">
    <div className="max-w-md w-full p-6">
      <h1 className="text-3xl font-semibold mb-6 text-black text-center">Forgot Password</h1>
      <p className="text-sm  text-gray-500 mb-6">Enter the Address Email associeted with  your account, and we'll send you a link to reset your password.</p>
      
     
      <form action="#" method="POST" className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="text" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
        </div>
        <div className='mt-6'>
          <button type="submit" className="btn w-full bg-indigo-500 text-white hover:bg-indigo-800">Continue</button>
        </div>
      </form>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>don't have an account? <a href="#" className="text-black hover:underline">Sign up here</a>
        </p>
      </div>
    </div>
  </div>
</div>
  )
}
