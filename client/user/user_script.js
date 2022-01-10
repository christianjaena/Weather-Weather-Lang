let username = document.getElementById('username');
let email = document.getElementById('email');
let date = document.getElementById('date');
let favoritesDiv = document.getElementById('favorites');
let updateButton = document.getElementById('updateButton');
let user;
let userID;
let favorites;
(async () => {
  userID = localStorage.getItem('userID');
  let userDetails = await fetch(`http://localhost:3000/user/${userID}`);
  let userFavorites = await fetch(`http://localhost:3000/favorite/${userID}`);
  user = await userDetails.json();
  favorites = await userFavorites.json();

  username.value = user.username;
  email.innerHTML += user.email;
  // LINQ - arr.first()
  date.innerHTML += user.createdAt.split('T').first();
  for (let index = 0; index < favorites.length; index++) {
    let element = favorites[index];
    favoritesDiv.innerHTML += `<h5 id=${element.woeid} class="fav">${element.location}</h5></br>`;
  }
  let favoriteCities = document.querySelectorAll('.fav');
  favoriteCities.forEach((element) => {
    console.log(element);
    element.addEventListener('click', () => {
      localStorage.setItem('woeid', element.id);
      window.location.href = 'http://localhost:3000/city';
    });
  });
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
