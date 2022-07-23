const pokeName = document.querySelector('.pokemon__name');
const pokeID = document.querySelector('.pokemon__number');
const pokeImg = document.querySelector('.pokemon__image');
const pokeForm = document.querySelector('.form');
const input = document.querySelector('.input__search')
const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')

let searchPoke = 1;

const fetchPokemon = async (pokemon) => {

    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(apiResponse.status === 200){
        const data = await apiResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {

    pokeName.innerHTML = 'Loading...';
    pokeID.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokeImg.style.display = 'block';
        pokeName.innerHTML = data.name;
        pokeID.innerHTML = data.id;
        pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = '';
        searchPoke = data.id;
    } else{
        pokeImg.style.display = 'none';
        pokeName.innerHTML = 'Not founded :(';
        pokeID.innerHTML = '';
    }
}

pokeForm.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

});

prev.addEventListener('click', () => {
    if(searchPoke > 1){
        searchPoke -= 1;
        renderPokemon(searchPoke);
    }
})

next.addEventListener('click', () => {
    searchPoke += 1;
    renderPokemon(searchPoke);
});

renderPokemon(searchPoke);
