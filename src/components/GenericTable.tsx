import React from "react";
import { FiPlus } from "react-icons/fi";

type Column<T> = {
  header: string;
  accessor: keyof T | string;
  render?: (row: T) => React.ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
};

export default function GenericTable<T>({ columns, data }: Props<T>) {
  return (
    <div className='bg-card border border-secondary-200 rounded-xl shadow-sm p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-semibold text-app'>Suas movimentações</h3>
        <button className='flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors'>
          <FiPlus />
          Nova movimentação
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left'>
          <thead className='bg-secondary-100 text-secondary-600 uppercase tracking-wider'>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className='px-4 py-2'>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className='border-t border-secondary-200 hover:bg-secondary-50 transition-colors'
              >
                {columns.map((col, cidx) => (
                  <td key={cidx} className='px-4 py-2 text-app'>
                    {col.render
                      ? col.render(row)
                      : String(row[col.accessor as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
