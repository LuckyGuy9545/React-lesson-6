import PokemonDataView from 'components/PokemonDataView';
import { useState, useEffect } from 'react';
import PokemonErrorView from 'components/PokemonErrorView';
import PokemonPendingView from 'components/PokemonPendingView';
import pokemonAPI from 'services/pokemon-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!pokemonName) {
      //* fetch пустой строки приведет к ошибку, поэтому делаем сперва проверку
      return;
    }

    setStatus(Status.PENDING);

    pokemonAPI
      .fetchPokemon(pokemonName)
      .then(pokemon => {
        //== послідовність важлива!
        setPokemon(pokemon);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [pokemonName]);

  if (status === Status.IDLE) {
    return <div>Ведите имя покемона</div>;
  }

  if (status === Status.PENDING) {
    return <PokemonPendingView pokemonName={pokemonName} />;
  }
  if (status === Status.REJECTED) {
    return <PokemonErrorView message={error.message} />;
  }
  if (status === Status.RESOLVED) {
    return <PokemonDataView pokemon={pokemon} />;
  }
}

/* //== До рефакторинга с использованием хуков
export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
    loading: false,
    error: null,
    status: 'iddle',
  };

  //* этот метод только с проверками
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    if (prevName !== nextName) {
      //   console.log('prevName', prevName);
      //   console.log('nextName', nextName);

      //*делаем текст Загружается ... во время рендера, у даляется старый покемон
      this.setState({ status: 'pending' });

      //*таймер для имитации подгрузки страницы
      setTimeout(() => {
        fetchPokemon(nextName)
          .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
          .catch(error => this.setState({ error, status: 'rejected' }));
      }, 3000);
    }
  }
  render() {
    const { pokemon, error, status } = this.state;
    const { pokemonName } = this.props;

    if (status === 'iddle') {
      return <div>Ведите имя покемона</div>;
    }

    if (status === 'pending') {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }
    if (status === 'rejected') {
      return <PokemonErrorView message={error.message} />;
    }
    if (status === 'resolved') {
      return <PokemonDataView pokemon={pokemon} />;
    }
  }
}

*/

/* //== ДО рефакторинга и подключения предсказуемых состояний (патерна State Machine )
 //* этот метод только с проверками
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pokemonName !== this.props.pokemonName) {
      //   console.log('prevProps.pokemonName', prevProps.pokemonName);
      //   console.log('this.props.pokemonName', this.props.pokemonName);

      //*делаем текст Загружается ... во время рендера, у даляется старый покемон
      this.setState({ loading: true, pokemon: null });
      fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.pokemonName}`)
        //* отличная проверка ошибки
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`There is no ${this.props.pokemonName}`)
          );
        })
        .then(pokemon => this.setState({ pokemon }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { loading, pokemon, error } = this.state;
    const { pokemonName } = this.props;

    return (
      <div style={{ marginLeft: 20 }}>
        //*а тут рендер описания ошибки 
        {error && <h1>{error.message}</h1>}
        {loading && <div>Загружается ...</div>}
         //*если нет имени(не передали во время субмита) покемона то будет рендерится эта строка 
        {!pokemonName && <div>Ведите имя покемона</div>}
        {pokemon && (
          <div>
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              width="200"
            ></img>
            <p>{pokemon.name}</p>
          </div>
        )}
      </div>
    );
  }
}

*/
