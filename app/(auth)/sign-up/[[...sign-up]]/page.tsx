import { SignUp } from '@clerk/nextjs';
import React from 'react';

const SignUpPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <SignUp />
      </div>
    </main>
  );
}

export default SignUpPage;
