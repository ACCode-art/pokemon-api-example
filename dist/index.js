const pokemonContainer = document.querySelector('.pokemonContainer');
const setName = document.querySelector('.setName');
const cardsInSet = document.querySelector('.cardsInSet');
const setImage = document.querySelector('.setImage');
const nav = document.querySelector('.nav');
const filter = document.querySelector('.filter');

let currentSet = '';

nav.addEventListener('click', (e) => {
  const target = e.target.innerText;
  switch (true) {
    case target === 'Battle Styles':
      getData('https://accode-test-server.herokuapp.com/battle_styles');
      break;
    case target === 'Chilling Reign':
      getData('https://accode-test-server.herokuapp.com/chilling_reign');
      break;
    case target === `Champion's Path`:
      getData('https://accode-test-server.herokuapp.com/champions_path');
      break;
  }
});

function filtered(array, value) {
  let result = array.filter((pokemon) =>
    pokemon.pokemon_name.toLowerCase().includes(value)
  );
  pokemonContainer.innerHTML = '';
  result.forEach((el) => {
    const HTML = `<img class='pokemonCard' src=${el.pokemon_image}>`;
    pokemonContainer.insertAdjacentHTML('beforeend', HTML);
  });
}

filter.addEventListener('keyup', (e) => {
  let value = e.target.value;

  filtered(currentSet, value);
});

function getData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      pokemonContainer.innerHTML = '';
      cardsInSet.textContent = `Cards in set: ${data.cards_in_set}`;
      setImage.src = data.set_image;
      data.set_cards.forEach((el) => {
        const HTML = `<img class='pokemonCard' src=${el.pokemon_image}>`;
        pokemonContainer.insertAdjacentHTML('beforeend', HTML);
      });
      currentSet = data.set_cards;
    });
}

getData('https://accode-test-server.herokuapp.com/battle_styles');
