/* eslint-disable react/prop-types */

const DataTable = ({ columns, data, tableName }) => {
  return (
    <div className="overflow-x-auto my-10 shadow-user-table rounded-2xl">
      <h3 className="text-xl font-semibold tracking-wide p-6">{tableName}</h3>
      <table className="table">
        <thead className="text-[#637381] bg-[#f4f6f8]">
          <tr className="border-0 tracking-wider">
            <th className="text-center py-5">#</th>
            {columns.slice(1, -1).map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-dashed">
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="py-7 border-t border-dashed"></div>
    </div>
  );
};

export default DataTable;
