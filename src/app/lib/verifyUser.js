import { useAuth } from '@/providers/authProvider';

const verifyUser = async () => {
  const { authData, setAuthData } = useAuth();

  const res = await fetch('/api/auth/', {
    method: 'GET',
  });
  if (res.ok && res.status !== 401) {
    // console.log(res.headers);
    const response = await res.json();
    setAuthData({
      userType: response.role === 'admin' ? 'admin' : 'user',
      isAuthenticated: true,
      userId: response.id,
    });
    response.role === 'admin'
      ? router.push('/dashboard')
      : router.push(`/userBusiness/${response.id}`);
  }
};

export default verifyUser;
