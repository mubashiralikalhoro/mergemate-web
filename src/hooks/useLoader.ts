import notify from '@/utils/notify';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useLoader = () => {
  const [loading, setLoading] = useState<boolean | string>('');
  const [toastId, setToastId] = useState('');

  useEffect(() => {
    if (loading && loading !== true) {
      setToastId(notify.loading(loading));
    } else {
      toast.dismiss(toastId);
    }
  }, [loading]);

  return { loading, setLoading };
};

export default useLoader;
