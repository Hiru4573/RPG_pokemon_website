export default function NavigationButtons({ onSave, updating = false }) {
    return (
      <div className="flex mb-1">
        <button
          className="text-white capitalize bg-red-900 hover:bg-red-800 mx-2 w-full cursor-pointer"
          onClick={() => (window.location.href = `/pkmn/new`)}
        >
          novo
        </button>
        <button
          className="text-white capitalize bg-red-900 hover:bg-red-800 mx-2 w-full cursor-pointer"
          onClick={() => (window.location.href = `/pkmn/list`)}
        >
          Cadastrados
        </button>
        <button
          className="text-white capitalize bg-red-900 hover:bg-red-800 mx-2 w-full cursor-pointer"
          onClick={onSave}
        >
          {updating?'Atualizar':'Salvar'}
        </button>
      </div>
    );
  }