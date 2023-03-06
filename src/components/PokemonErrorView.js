export default function PokemonErrorView({ message }) {
  return (
    <div role="alert">
      <p>{message}</p>
    </div>
  );
}
