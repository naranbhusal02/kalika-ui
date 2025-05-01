"use client"
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '../../store/useAuthStore';

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setTokens = useAuthStore((state) => state.setTokens);
  const getProfile = useAuthStore((state) => state.getProfile);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get tokens and userId from URL parameters
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const userId = searchParams.get('userId');

        if (!accessToken || !refreshToken || !userId) {
          throw new Error('Missing authentication data');
        }

        // Store tokens and userId
        setTokens(accessToken, refreshToken, userId);
        
        // Fetch user profile
        await getProfile();
        router.push('/'); // Redirect to home page after successful auth
      } catch (error) {
        console.error('Auth failed:', error);
        router.push('/login?error=auth_failed');
      }
    };

    initAuth();
  }, [getProfile, router, searchParams, setTokens]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-gray-600">Please wait while we complete your sign-in.</p>
      </div>
    </div>
  );
}

export default function AuthSuccess() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait...</p>
        </div>
      </div>
    }>
      <AuthSuccessContent />
    </Suspense>
  );
}