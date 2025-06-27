import React, { useEffect, useState } from 'react';
import { getDataApiCall } from '../utils/api';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDataApiCall('rawData');
        setData(res.data);
        if (res.data.length > 0) {
          setColumns(Object.keys(res.data[0]));
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleDownloadCSV = () => {
    if (data.length === 0) return;

    const csvRows = [
      columns.join(","), // header row
      ...data.map((row) =>
        columns.map((col) => `"${row[col] ?? ''}"`).join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exported_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f3f0e1] py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="flex justify-between items-center bg-[#c2a76b] text-white py-4 px-6">
          <h2 className="text-2xl font-semibold">Dynamic Data Table</h2>
          <button
            onClick={handleDownloadCSV}
            className="bg-white text-[#5c4520] border border-[#a88a4a] px-4 py-2 rounded-lg text-sm hover:bg-[#f3e6c7] transition"
          >
            Download CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#e0d5b8]">
            <thead className="bg-[#e6d6ab] text-[#5c4520]">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-sm font-medium uppercase"
                  >
                    {col.replace(/_/g, ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-[#fffdf5] divide-y divide-[#e7dabf] text-[#3e2f1c]">
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-[#fdf5e6] transition">
                  {columns.map((col) => (
                    <td key={col} className="px-6 py-4">
                      {typeof row[col] === "string" && Date.parse(row[col])
                        ? new Date(row[col]).toLocaleDateString()
                        : row[col]?.toString() ?? ""}
                    </td>
                  ))}
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="text-center py-6 text-[#9c8452]">
                    Loading or No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
