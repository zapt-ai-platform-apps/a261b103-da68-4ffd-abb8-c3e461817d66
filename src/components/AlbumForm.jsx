import { Show } from 'solid-js';

export default function AlbumForm(props) {
  return (
    <form onSubmit={props.handleUpdate} class="space-y-4">
      <input
        type="text"
        placeholder="Album Title"
        value={props.title()}
        onInput={(e) => props.setTitle(e.currentTarget.value)}
        class="w-full p-3 border border-gray-300 rounded box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
        required
      />
      <textarea
        placeholder="Album Description"
        value={props.description()}
        onInput={(e) => props.setDescription(e.currentTarget.value)}
        class="w-full p-3 border border-gray-300 rounded box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
      />
      <div class="flex space-x-4">
        <button
          type="submit"
          class="flex-1 py-2 px-4 bg-green-500 text-white rounded cursor-pointer transition duration-300"
          classList={{
            'opacity-50': props.loading(),
            'hover:bg-green-600': !props.loading(),
          }}
          disabled={props.loading()}
        >
          <Show when={!props.loading()} fallback={'Updating...'}>
            Update Album
          </Show>
        </button>
        <button
          type="button"
          onClick={props.handleDelete}
          class="flex-1 py-2 px-4 bg-red-500 text-white rounded cursor-pointer transition duration-300"
          classList={{
            'opacity-50': props.loading(),
            'hover:bg-red-600': !props.loading(),
          }}
          disabled={props.loading()}
        >
          <Show when={!props.loading()} fallback={'Deleting...'}>
            Delete Album
          </Show>
        </button>
      </div>
    </form>
  );
}