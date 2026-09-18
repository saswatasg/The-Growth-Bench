import React from 'react';
import { Plus, X } from 'lucide-react';

const RosterTable = ({ rows, setRows, errors }) => {
  const addRow = () => {
    setRows([...rows, { name: '', email: '' }]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index] = { ...updated[index], [field]: value };
    setRows(updated);
  };

  const getError = (rowIndex, field) => {
    return errors?.find(e => e.row === rowIndex && e.field === field)?.message;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading-md text-ink">Employee Roster</h3>
        <span className="text-body-sm text-mute">{rows.length} {rows.length === 1 ? 'person' : 'people'}</span>
      </div>

      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => updateRow(i, 'name', e.target.value)}
                  placeholder="Full name"
                  className={`w-full px-3 py-2 text-body-sm bg-canvas border ${getError(i, 'name') ? 'border-sale' : 'border-hairline-soft'} focus:outline-none focus:border-ink transition-colors`}
                />
                {getError(i, 'name') && <p className="text-caption-sm text-sale mt-1">{getError(i, 'name')}</p>}
              </div>
              <div>
                <input
                  type="email"
                  value={row.email}
                  onChange={(e) => updateRow(i, 'email', e.target.value)}
                  placeholder="Email address"
                  className={`w-full px-3 py-2 text-body-sm bg-canvas border ${getError(i, 'email') ? 'border-sale' : 'border-hairline-soft'} focus:outline-none focus:border-ink transition-colors`}
                />
                {getError(i, 'email') && <p className="text-caption-sm text-sale mt-1">{getError(i, 'email')}</p>}
              </div>
            </div>
            {rows.length > 1 && (
              <button
                onClick={() => removeRow(i)}
                className="w-8 h-8 flex items-center justify-center text-mute hover:text-sale transition-colors mt-1"
                aria-label={`Remove row ${i + 1}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={addRow}
        className="mt-4 flex items-center gap-2 text-body-sm text-ink hover:text-mute transition-colors"
      >
        <Plus className="w-4 h-4" /> Add another employee
      </button>
    </div>
  );
};

export default RosterTable;
