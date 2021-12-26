(async () => {
  let getRequest = await fetch('http://localhost:3000/session/auth');
  let response = await getRequest;
  if (response.redirected) {
    window.location.href = response.url;
  }
})();
