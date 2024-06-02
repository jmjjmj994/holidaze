export const checkUrlValid = async (url: string) => {
  return fetch(url, { method: 'HEAD' })
    .then((res) => {
      const contentType = res.headers.get('Content-Type');
      if (!contentType) {
        return false;
      }
      return contentType.startsWith('image');
    })
    .catch((error) => {
      console.error('Error fetching URL:', error);
      return false;
    });
};

export const hasToken = (): boolean => {
  const token = localStorage.getItem('token') || '';
  if (!token) return false;
  return true;
};

export const getUsername = () => {
  const username = JSON.parse(localStorage.getItem('user') || '').name;
  return username;
};
