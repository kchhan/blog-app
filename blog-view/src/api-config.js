let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'kchhan-blog-editor.herokuapp.com') {
  backendHost = 'https://kchhan-blog-api.herokuapp.com';
} else {
  backendHost = 'http://localhost:5000';
}

console.log(backendHost)

export const API_ROOT = `${backendHost}`;
