const pokemonContainer = document.querySelector('.pokemonContainer');
const setName = document.querySelector('.setName');
const cardsInSet = document.querySelector('.cardsInSet');
const setImage = document.querySelector('.setImage');
const nav = document.querySelector('.nav');
const menu__overlay = document.querySelector('.menu__overlay');
const filter = document.querySelector('.filter');
const menu = document.querySelector('.menu');

let currentSet = '';

// let menuOpen = false;

menu.addEventListener('click', () => {
  menu__overlay.classList.toggle('display__block');
});

menu__overlay.addEventListener('click', (e) => {
  const target = e.target.innerText;
  switch (true) {
    case target === 'Battle Styles':
      getData('https://accode-test-server.herokuapp.com/battle_styles');
      menu__overlay.classList.remove('display__block');
      break;
    case target === 'Chilling Reign':
      getData('https://accode-test-server.herokuapp.com/chilling_reign');
      menu__overlay.classList.remove('display__block');
      break;
    case target === `Champion's Path`:
      getData('https://accode-test-server.herokuapp.com/champions_path');
      menu__overlay.classList.remove('display__block');
      break;
    case target === `Evolving Skies`:
      getData('https://accode-test-server.herokuapp.com/evolving_skies');
      menu__overlay.classList.remove('display__block');
      break;
    case target === `Rebel Clash`:
      getData('https://accode-test-server.herokuapp.com/rebel_clash');
      menu__overlay.classList.remove('display__block');
      break;
    case target === `Shining Fates`:
      getData('https://accode-test-server.herokuapp.com/shining_fates');
      menu__overlay.classList.remove('display__block');
      break;
    case target === `Vivid Voltage`:
      getData('https://accode-test-server.herokuapp.com/vivid_voltage');
      menu__overlay.classList.remove('display__block');
      break;
    case target === `Sword & Shield`:
      getData('https://accode-test-server.herokuapp.com/sword_shield');
      menu__overlay.classList.remove('display__block');
      break;
    case target === `Darkness Ablaze`:
      getData('https://accode-test-server.herokuapp.com/darkness_ablaze');
      menu__overlay.classList.remove('display__block');
      break;
  }
});

function displayRandomSet() {
  const array = [
    'https://accode-test-server.herokuapp.com/battle_styles',
    'https://accode-test-server.herokuapp.com/chilling_reign',
    'https://accode-test-server.herokuapp.com/champions_path',
  ];

  let randomNumber = Math.floor(Math.random() * array.length);

  getData(array[randomNumber]);
}

function filtered(array, value) {
  let result = array.filter((pokemon) =>
    pokemon.pokemon_name.toLowerCase().includes(value.toLowerCase())
  );
  pokemonContainer.innerHTML = '';
  if (result.length > 0) {
    result.forEach((el) => {
      const HTML = `<img class='pokemonCard' src=${el.pokemon_image}>`;
      pokemonContainer.insertAdjacentHTML('beforeend', HTML);
    });
  } else {
    pokemonContainer.innerHTML = `<h3>No pokemon with the name '${value}' in this set</h3>`;
  }
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
      filter.placeholder = `Search ${data.set_name}...`;
      data.set_cards.forEach((el) => {
        const HTML = `<img loading='lazy' class='pokemonCard' src=${el.pokemon_image}>`;
        pokemonContainer.insertAdjacentHTML('beforeend', HTML);
      });
      currentSet = data.set_cards;
    });
}

displayRandomSet('https://accode-test-server.herokuapp.com/battle_styles');
