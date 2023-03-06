import { Component } from 'react';
//*npm библиотека - нотификация, ставится на самом верхнем уровне(App у нас)
import { ToastContainer } from 'react-toastify';
import PokemonForm from './PokemonForm';
import PokemonInfo from './PokemonInfo';

export default class App extends Component {
  state = {
    pokemonName: '',
  };

  handleFormSubmit = pokemonName => {
    this.setState({ pokemonName });
  };

  render() {
    return (
      <div>
        <PokemonForm onSubmit={this.handleFormSubmit} />
        <PokemonInfo pokemonName={this.state.pokemonName} />
        <ToastContainer autoClose={2000} />
      </div>
    );
  }
}

//* простой вариант фетча и рендера по http-запросу
// componentDidMount() {
//     this.setState({ loading: true });

//     setTimeout(() => {
//       fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
//         .then(res => res.json())
//         .then(pokemon => this.setState({ pokemon }))
//         .finally(() => this.setState({ loading: false }));
//     }, 1000);
//   }
//   render() {
//     return (
//       <div>
//         {this.state.loading && <h1>Loading...</h1>}
//         {this.state.pokemon && <div>{this.state.pokemon.name}</div>}
//       </div>
//     );
//   }
// }
