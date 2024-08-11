"use client";

import { useEffect, useState } from "react";

export default function TransformData({ data }: { data: any }) {
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setColumns(data);
      console.log(Object.entries(data[0]));
    }
  }, [data]);

  return (
    <main>
      <ul className="flex flex-wrap">
        {columns.length > 0 ? (
          Object.entries(columns[0]).map(([key, value], index: number) => (
            <div
              className={`flex-1 h-[100%] flex flex-col items-center justify-center`}
              key={index}
            >
              {key}
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </ul>
    </main>
  );
}
