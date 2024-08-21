"use client"

import { useEffect, useState } from "react";

interface DataType {
  [key: string]: any;
}

interface DisplayDataProps {
  importedData: DataType[];
}

export default function DisplayData({ importedData }: DisplayDataProps) {
  const [data, setData] = useState<DataType[]>([]);
  
  useEffect(() => {
    setData(importedData);
  }, [importedData]);

  const hasData = data.length > 0;

  return (
    <main>
      {hasData && (
        <div className="flex flex-row justify-evenly items-center h-[50px] w-[calc(90vw-1px)] rounded-t-lg absolute bg-white">
          {Object.entries(data[0] || {}).map(([key], index) => (
            <div className="flex-1 h-[100%] flex flex-col items-center shadow-xl justify-center" key={index}>
              {key}
            </div>
          ))}
        </div>
      )}

      <div className={`${hasData ? "mt-[52px]" : ""} max-h-[80vh] overflow-auto divide-y`}>
        {hasData ? (
          data.map((item, index) => (
            <li className="flex flex-row justify-evenly items-center h-[150px]" key={index}>
              {Object.entries(item).map(([key, value], i) => (
                <div className="flex-1 h-[100%] flex flex-col items-center" key={i}>
                  <div className={`text-wrap w-[100%] h-full flex justify-center items-center ${typeof value === 'string' && value.length > 30 ? "overflow-auto text-center text-[0.7rem] p-1" : "p-1"}`}>
                    {typeof value === 'boolean' ? `${value ? "True" : "False"}` : value}
                  </div>
                </div>
              ))}
            </li>
          ))
        ) : (
          <div className="flex justify-center items-center m-auto h-full w-full">
            Please Import Data
          </div>
        )}
      </div>
    </main>
  );
}
