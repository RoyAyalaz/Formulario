document.addEventListener('DOMContentLoaded', function() {
  const userForm = document.getElementById('userForm');
  const userList = document.getElementById('userList');
  const searchBar = document.getElementById('searchBar');
  let users = []; 

  userForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombreCompleto = document.getElementById('nombreCompleto').value;
    const email = document.getElementById('email').value;
    const foto = document.getElementById('foto').value;

    users.push({ nombreCompleto, email, foto });
    userForm.reset();

    updateUserList(users);
  });

  searchBar.addEventListener('input', function() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredUsers = users.filter(user =>
      user.nombreCompleto.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
    updateUserList(filteredUsers);
  });

  function updateUserList(userArray) {
    userList.innerHTML = ''; 
    userArray.forEach((user, index) => {
      const userCard = document.createElement('div');
      userCard.className = 'col-lg-4 col-md-6 card-user'; 
      userCard.innerHTML = `
        <div class="card h-100"> 
          <img src="${user.foto}" class="card-img-top" alt="${user.nombreCompleto}">
          <div class="card-body">
            <h5 class="card-title">${user.nombreCompleto}</h5>
            <p class="card-text">${user.email}</p>
            <button onclick="deleteUser(${index})" class="btn btn-danger btn-small">Borrar Usuario</button>
          </div>
        </div>
      `;
      userList.appendChild(userCard);
    });
  }

  window.deleteUser = function(index) {
    users.splice(index, 1); 
    updateUserList(users);
  };
});
