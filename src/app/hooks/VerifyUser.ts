import { useAuth } from '@/providers/authProvider';
import { useRouter } from 'next/navigation';

const useVerifyUser = () => {
  const { authData, setAuthData } = useAuth();
  const router = useRouter();

  const verifyUser = async () => {
    const res = await fetch('/api/auth/', {
      method: 'GET',
    });

    if (res.ok && res.status !== 401) {
      const response = await res.json();
      setAuthData({
        userType: response.role === 'admin' ? 'admin' : 'user',
        isAuthenticated: true,
        userId: response.id,
      });

      return response.role === 'admin'
        ? router.push('/dashboard')
        : router.push(`/userBusiness/${response.id}`);
    }
    router.push('/login');
  };

  const verifyRole = async () => {
    const res = await fetch('/api/auth/', {
      method: 'GET',
    });
    if (res.ok && res.status !== 401) {
      const response = await res.json();
      setAuthData({
        userType: response.role === 'admin' ? 'admin' : 'user',
        isAuthenticated: true,
        userId: response.id,
      });

      return;
    }
    router.push('/login');
  };

  return { verifyUser, verifyRole };
};

export default useVerifyUser;
