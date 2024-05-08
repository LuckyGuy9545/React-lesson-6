function fetchPokemon(name) {
  return (
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      //* отличная проверка ошибки
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`There is no ${name}`));
      })
  );
}

const api = {
  fetchPokemon,
};

export default api;
