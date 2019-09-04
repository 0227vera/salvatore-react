export default function getRedirectPath ({userType,headImg}) {
  let url = `/${userType}`;
  if (!headImg) {url += 'info'}
  return url
}