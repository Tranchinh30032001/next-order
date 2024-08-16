import React, { Suspense } from 'react';
import FormLogin from './components/FormLogin';

const LoginPage = () => {
  return (
    <Suspense>
      <main className="flex items-center justify-center h-[calc(100vh-var(--height-header))] -mt-[calc(var(--height-header)/2)]">
        <div className="max-w-xl w-full  border-[1px] p-4 rounded-lg" >
          <h1 className="font-bold text-xl mb-4">Login Form</h1>
          <FormLogin />
        </div>
      </main>
    </Suspense>
  );
};

export default LoginPage;
