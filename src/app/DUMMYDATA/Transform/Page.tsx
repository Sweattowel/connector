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
      <ul className="flex flex-col flex-wrap divide-y">
        {columns.length > 0 ? (
          Object.entries(columns[0]).map(([key, value], index: number) => (
            <div
              className={`flex-1 h-[100%] flex flex items-center justify-center p-1`}
              key={index}
            >
                <div
                    className="flex  w-full justify-evenly"
                >
                    <input
                        className="w-[200px] text-center border rounded hover:shadow hover:shadow-inner hover:border-black"
                        type="text"
                        placeholder={key}
                    />
                    <div
                        className="w-[150px] flex justify-evenly items-center"
                    >
                        AS 
                        <button
                            className="w-[100px] border rounded-lg p-1 hover:shadow hover:shadow-inner hover:border-black"
                        >
                            {typeof(value)}
                        </button>                           
                    </div>
                    <button
                        className="border rounded-lg p-1 hover:shadow hover:shadow-inner hover:border-black"
                    >
                        Include?
                    </button>  
                </div>

               
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </ul>
    </main>
  );
}
