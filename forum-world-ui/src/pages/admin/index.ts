import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AdminIndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/pages');
  }, []);

  return null;
};

export default AdminIndexPage;