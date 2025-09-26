let pokemonListData = []; // Variable global para almacenar la lista de Pokémon
let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Carga favoritos desde localStorage

const pokeCard = document.querySelector('.poke-card');
const pokeNameIdExp = document.querySelector('.poke-card__name-id-exp');
const pokeImg = document.querySelector('.poke-card__img');
const pokeImgContainer = document.querySelector('.poke-card__img-container');
const pokeTypes = document.querySelector('.poke-card__types');
const pokeStats = document.querySelector('.poke-card__stats');
const pokemonList = document.querySelector('.pokemon-list');
const pokeAbilities = document.querySelector('.poke-card__abilities');
const pokeHeightWeight = document.querySelector('.poke-card__height-weight');
const favoritesList = document.querySelector('.favorites-list');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    if (!value.trim()) {
        alert('Por favor, ingrese un nombre o ID de Pokémon');
        return;
    }
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound());
};

const fetchPokemonList = async (limit = 20) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
        const data = await response.json();
        pokemonListData = data.results;
        renderPokemonList();
        renderFavorites();
        console.log('Lista de Pokémon cargada:', pokemonListData);
    } catch (err) {
        console.error('Error al cargar la lista de Pokémon:', err);
    }
};

const renderPokemonList = async () => {
    pokemonList.innerHTML = '';
    const promises = pokemonListData.map(pokemon => fetch(pokemon.url).then(res => res.json()));
    const pokemons = await Promise.all(promises);
    pokemons.forEach((data, index) => {
        const pokemon = pokemonListData[index];
        const pokemonItem = document.createElement('div');
        pokemonItem.className = 'pokemon-list__item';
        const infoContainer = document.createElement('div');
        infoContainer.className = 'pokemon-list__info';
        const icon = document.createElement('img');
        icon.className = 'pokemon-list__icon';
        icon.src = data.sprites.other["official-artwork"].front_default || './pokeball.png';
        const number = document.createElement('span');
        number.className = 'pokemon-list__number';
        number.textContent = `#${data.id}`;
        const nameSpan = document.createElement('span');
        nameSpan.textContent = pokemon.name;
        infoContainer.appendChild(icon);
        infoContainer.appendChild(number);
        infoContainer.appendChild(nameSpan);
        pokemonItem.appendChild(infoContainer);
        const favoriteIcon = document.createElement('span');
        favoriteIcon.className = 'pokemon-list__favorite';
        favoriteIcon.textContent = favorites.includes(data.id) ? '★' : '☆';
        favoriteIcon.setAttribute('role', 'button');
        favoriteIcon.setAttribute('aria-label', `Marcar ${pokemon.name} como favorito`);
        favoriteIcon.setAttribute('tabindex', '0');
        favoriteIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(data.id);
            renderPokemonList();
            renderFavorites();
        });
        favoriteIcon.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.stopPropagation();
                toggleFavorite(data.id);
                renderPokemonList();
                renderFavorites();
            }
        });
        pokemonItem.appendChild(favoriteIcon);
        pokemonItem.addEventListener('click', () => renderPokemonData(data));
        pokemonList.appendChild(pokemonItem);
    });
};

const renderFavorites = () => {
    if (!favoritesList) return;
    favoritesList.innerHTML = '';
    const favoritePokemons = pokemonListData.filter(pokemon => 
        favorites.includes(getPokemonIdFromUrl(pokemon.url))
    );
    favoritePokemons.forEach(pokemon => {
        const pokemonItem = document.createElement('div');
        pokemonItem.className = 'favorites-list__item';
        fetch(pokemon.url)
            .then(res => res.json())
            .then(data => {
                const infoContainer = document.createElement('div');
                infoContainer.className = 'favorites-list__info';
                const icon = document.createElement('img');
                icon.className = 'favorites-list__icon';
                icon.src = data.sprites.other["official-artwork"].front_default || './pokeball.png';
                const number = document.createElement('span');
                number.className = 'favorites-list__number';
                number.textContent = `#${data.id}`;
                const nameSpan = document.createElement('span');
                nameSpan.textContent = pokemon.name;
                infoContainer.appendChild(icon);
                infoContainer.appendChild(number);
                infoContainer.appendChild(nameSpan);
                pokemonItem.appendChild(infoContainer);
                pokemonItem.addEventListener('click', () => renderPokemonData(data));
            });
        favoritesList.appendChild(pokemonItem);
    });
};

const renderPokemonData = data => {
    const sprite = data.sprites.other["official-artwork"].front_default || './pokeball.png';
    const { stats, types, abilities, height, weight, base_experience } = data;
    pokeImg.setAttribute('src', sprite);
    pokeNameIdExp.innerHTML = `
        <div class="poke-card__id">${data.id}</div>
        <div class="poke-card__name">${data.name}</div>
        <div class="poke-card__base-exp">EXP Base: ${base_experience}</div>
    `;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonHeightWeight(height, weight);
    renderPokemonStats(stats);
    renderPokemonAbilities(abilities);
};

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '5px 5px';
};

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement('div');
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
};

const renderPokemonHeightWeight = (height, weight) => {
    pokeHeightWeight.innerHTML = `
        <div>Altura: ${(height / 10).toFixed(1)} m</div>
        <div>Peso: ${(weight / 10).toFixed(1)} kg</div>
    `;
};

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    const statNames = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
    stats.forEach(stat => {
        if (statNames.includes(stat.stat.name)) {
            const statElement = document.createElement('div');
            const statElementName = document.createElement('div');
            const statElementAmount = document.createElement('div');
            statElementName.textContent = stat.stat.name.replace('-', ' ');
            statElementAmount.textContent = stat.base_stat;
            statElement.appendChild(statElementName);
            statElement.appendChild(statElementAmount);
            pokeStats.appendChild(statElement);
        }
    });
};

const renderPokemonAbilities = abilities => {
    pokeAbilities.innerHTML = '';
    abilities.forEach(ability => {
        const abilityElement = document.createElement('div');
        abilityElement.textContent = ability.ability.name;
        pokeAbilities.appendChild(abilityElement);
    });
};

const renderNotFound = () => {
    pokeNameIdExp.innerHTML = 'No encontrado';
    pokeImg.setAttribute('src', './pokeball.png');
    pokeImg.style.background = '#fff';
    pokeImgContainer.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeHeightWeight.innerHTML = '';
    pokeAbilities.innerHTML = '';
};

// Funciones para favoritos
const getPokemonIdFromUrl = (url) => {
    return parseInt(url.split('/').filter(Boolean).pop());
};

const toggleFavorite = (id) => {
    const index = favorites.indexOf(id);
    if (index === -1) {
        favorites.push(id);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderPokemonList();
    renderFavorites();
};

// Asociar botón de carga
document.querySelector('.pokedex__load-button').addEventListener('click', () => fetchPokemonList(20));

// Carga inicial automática
window.addEventListener('load', () => fetchPokemonList(20));
