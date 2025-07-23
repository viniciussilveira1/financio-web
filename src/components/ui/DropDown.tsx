interface DropDownItem {
  id: number;
  name: string;
}

interface DropDownProps {
  items: DropDownItem[];
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}

export default function DropDown({
  items,
  selectedId,
  setSelectedId,
}: DropDownProps) {
  if (items.length === 0)
    return (
      <div className='text-sm text-secondary-500'>
        Nenhuma carteira encontrada
      </div>
    );

  return (
    <div className='mb-4'>
      <label
        htmlFor='wallet-select'
        className='block mb-2 text-sm font-medium text-app'
      >
        Selecione uma carteira
      </label>
      <select
        id='wallet-select'
        className='border border-secondary-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
        value={selectedId ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          setSelectedId(value ? Number(value) : null);
        }}
      >
        {items &&
          items.map((item: DropDownItem) => (
            <option key={item.id} value={item.id}>
              {item.name || `Item #${item.id}`}
            </option>
          ))}
      </select>
    </div>
  );
}
