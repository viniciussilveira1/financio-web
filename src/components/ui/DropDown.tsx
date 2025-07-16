interface DropDownItem {
  id: number;
  name: string;
}

interface DropDownProps {
  items: DropDownItem[];
<<<<<<< HEAD
  selectedId?: number;
  onChange?: (id: number) => void;
=======
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
>>>>>>> 8ccd885ba9f828b25431f8d027211d9277a067f5
}

export default function DropDown({
  items,
  selectedId,
<<<<<<< HEAD
  onChange,
}: DropDownProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    onChange?.(value);
  };

=======
  setSelectedId,
}: DropDownProps) {
>>>>>>> 8ccd885ba9f828b25431f8d027211d9277a067f5
  return (
    <div className='mb-4'>
      <label
        htmlFor='wallet-select'
        className='block mb-2 text-sm font-medium text-app'
      >
<<<<<<< HEAD
        Selecione uma carteira
=======
        Select Wallet
>>>>>>> 8ccd885ba9f828b25431f8d027211d9277a067f5
      </label>
      <select
        id='wallet-select'
        className='border border-secondary-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
<<<<<<< HEAD
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
=======
        value={selectedId ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          setSelectedId(value ? Number(value) : null);
        }}
      >
        <option value=''>-- Choose a wallet --</option>
        {items &&
          items.map((item: DropDownItem) => (
            <option key={item.id} value={item.id}>
              {item.name || `Item #${item.id}`}
            </option>
          ))}
>>>>>>> 8ccd885ba9f828b25431f8d027211d9277a067f5
      </select>
    </div>
  );
}
