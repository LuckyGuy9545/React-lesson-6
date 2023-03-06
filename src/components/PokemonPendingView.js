import { ImSpinner } from 'react-icons/im';
import PokemonDataView from './PokemonDataView';
import pendingImage from './pending.png';
import './loading.css';

const styles = {
  spinner: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
};

export default function PokemonPendingView({ pokemonName }) {
  //*делаем скелетон (то что будет показываться во время загрузки, как шаблон)
  //*этот шаблон ручками лепить
  const pokemon = {
    name: pokemonName,
    sprites: {
      other: {
        'official-artwork': {
          front_default: pendingImage,
        },
      },
    },
    stats: [],
  };

  return (
    <div role="alert">
      <div style={styles.spinner}>
        <ImSpinner size="32" className="icon-spin" />
        Загружаем...
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  );
}
