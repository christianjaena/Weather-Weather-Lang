let username = document.getElementById('username');
let email = document.getElementById('email');
let date = document.getElementById('date');
let updateButton = document.getElementById('updateButton');
let user;
let userID;
(async () => {
  userID = localStorage.getItem('userID');
  let request = await fetch(`http://localhost:3000/user/${userID}`);
  user = await request.json();

  username.value = user.username;
  email.innerHTML += user.email;
  // LINQ - arr.first()
  date.innerHTML += user.createdAt.split('T').first();
})();

updateButton.addEventListener('click', async () => {
  if (user.username === username.value) {
    alert('Username has not been changed');
  } else {
    let request = await fetch(`http://localhost:3000/user/${userID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value }),
    });
    let result = await request.json();
    alert('Username updated!');
  }
});
