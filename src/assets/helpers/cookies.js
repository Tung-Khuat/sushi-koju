
export function createCookie(name, value, seconds) {
  let expires = '';
  if (seconds) {
    const date = new Date();
    date.setTime(date.getTime() + (seconds * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}

export function readCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function removeCookie(name) {
  createCookie(name, '', -1);
}

export function removeAllCookies() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) { removeCookie(cookies[i].split('=')[0]); }
}
