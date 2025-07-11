interface DropDownItem {
  id: number;
  name: string;
}

interface DropDownProps {
  items: DropDownItem[];
  selectedId?: number;
  onChange?: (id: number) => void;
}

export default function DropDown({
  items,
  selectedId,
  onChange,
}: DropDownProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    onChange?.(value);
  };

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
        value={selectedId || ""}
        onChange={handleChange}
      >
        {items && items.length > 0 ? (
          items.map((item: DropDownItem) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))
        ) : (
          <option value=''>Nenhuma carteira encontrada</option>
        )}
      </select>
    </div>
  );
}
