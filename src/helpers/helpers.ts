export const hasToken = (): boolean => {
  const token = localStorage.getItem('token') || '';
  if (!token) return false;
  return true;
};
