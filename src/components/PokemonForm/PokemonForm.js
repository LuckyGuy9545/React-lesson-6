import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
//*библиотека нотификаций
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PokemonForm({ onSubmit }) {
  const [pokemonName, setPokemonName] = useState('');

  const handleNameChange = e => {
    setPokemonName(e.currentTarget.value.toLowerCase());
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    //* trim() чтобы убрать пробелы, ибо пустая строка с пробелами - не пустая строка
    if (pokemonName.trim() === '') {
      return toast.error('Input is EMPTY');
    }
    onSubmit(pokemonName);
    setPokemonName('');
  };

  return (
    <form onSubmit={handleFormSubmit} style={{ margin: 20 }}>
      <input
        type="text"
        name="pokemonName"
        value={pokemonName}
        onChange={handleNameChange}
        style={{ padding: 10 }}
      />
      <button type="submit" style={{ marginLeft: 10 }}>
        <BsSearch />
      </button>
    </form>
  );
}

//-- до рефакторинга
// export default class PokemonForm extends Component {
//   state = {
//     pokemonName: '',
//   };

//   handleFormSubmit = e => {
//     e.preventDefault();

//     //* trim() чтобы убрать пробелы, ибо пустая строка с пробелами - не пустая строка
//     if (this.state.pokemonName.trim() === '') {
//       return toast.error('Input is EMPTY');
//     }

//     this.props.onSubmit(this.state.pokemonName);
//     this.setState({ pokemonName: '' });
//   };

//   handleNameChange = e => {
//     this.setState({ pokemonName: e.currentTarget.value.toLowerCase() });
//   };
//   render() {
//     return (
//       <form onSubmit={this.handleFormSubmit} style={{ margin: 20 }}>
//         <input
//           type="text"
//           name="pokemonName"
//           value={this.state.pokemonName}
//           onChange={this.handleNameChange}
//           style={{ padding: 10 }}
//         />
//         <button type="submit" style={{ marginLeft: 10 }}>
//           <BsSearch />
//         </button>
//       </form>
//     );
//   }
// }
