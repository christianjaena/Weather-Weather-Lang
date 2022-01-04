(async () => {
  let userID = localStorage.getItem('userID');
  let request = await fetch(`http://localhost:3000/user/${userID}`);
  let user = await request.json();
  let username = document.getElementById('username');
  let email = document.getElementById('email');
  let date = document.getElementById('date');
  let updateButton = document.getElementById('updateButton');

  username.value = user.username;
  email.innerHTML += user.email;
  date.innerHTML += user.createdAt.split('T')[0];
})();
