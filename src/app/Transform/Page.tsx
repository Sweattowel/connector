"use client";

import { error } from "console";
import { useEffect, useState } from "react";
interface columnStruc {
  key: string,
  value: any,
  type: string,
  include: boolean,
  takeFrom: boolean,
  error: string
}
export default function TransformData({ data }: { data: any }) {

  const [keys, setKeys] = useState<columnStruc[]>([]);

  useEffect(() => {
    if (data) {
      let newKeys = [];
      for (const [key, value] of Object.entries(data[0])) {
        newKeys.push({
          key: key, 
          value: value,
          type:typeof(value),
          include: true,
          takeFrom: false,
          error: "key"
        });
      }
      setKeys(newKeys);
    }
  }, [data]);

  const addNewKey = () => {

    const updatedKeys = [...keys, 
      {
        key: `Key N*${keys.length + 1}`,
        value: 'Undefined',
        type: "string",
        include: true,
        takeFrom: false
      }
    ];

    setKeys(updatedKeys);
  };

  return (
    <main className="min-h-[32vh] flex flex-col justify-evenly">
      <ul className="flex flex-col flex-wrap divide-y mb-2">
        {keys.length > 0 ? (
          keys.map((key: columnStruc, index: number) => (
            <div
              className="flex-1 h-[100%] max-w-[100%] flex flex items-center justify-center p-1"
              key={index}
            >
              <div className="flex w-full justify-evenly">
                <input
                  className={`${key.error === "Duplicate Key" && "bg-red-600 animate-pulse"} w-[200px] text-center border rounded hover:shadow hover:shadow-inner hover:border-black`}
                  type="text"
                  onChange={(e) => {
                    const newKey = e.target.value;
                    if (keys.filter(k => k.key === newKey).length > 0){
                      setKeys((prevKeys) => 
                        prevKeys.map((item) =>
                          item.key === key.key ? {...item, error: `Duplicate Key`} : item
                        )
                      )
                      return
                    }
                    setKeys((prevKeys) => 
                      prevKeys.map((item) =>
                        item.key === key.key ? {...item, key: `${e.target.value}`, error: ""} : item
                      )
                    )
                  }}
                  placeholder={key.key}
                />
                <div className="w-[150px] flex justify-evenly items-center">
                  AS
                  <button className="w-[100px] border rounded-lg p-1 hover:shadow hover:shadow-inner hover:border-black">
                    {key.type}
                  </button>
                </div>
                <div
                  className="flex flex-col"
                >
                  <button
                    className={`${key.takeFrom && "bg-black text-white"} w-[100px] h-[50%] text-center border rounded hover:shadow hover:shadow-inner hover:border-black`}
                    onClick={() => {
                      setKeys((prevKeys) => 
                        prevKeys.map((item) => 
                        item.key === key.key ? {...item, takeFrom: true } : item
                        )
                      )
                    }}
                  >
                    Take From
                  </button>
                  <button
                    className={`${!key.takeFrom && "bg-black text-white"} w-[100px] h-[50%] text-center border rounded hover:shadow hover:shadow-inner hover:border-black`}
                    onClick={() => {
                      setKeys((prevKeys) => 
                        prevKeys.map((item) => 
                          item.key === key.key ? {...item, takeFrom: false } : item
                        )
                      )
                    }}
                  >
                    Default set
                  </button>
                </div>
                <input 
                  type="text" 
                  className="w-[200px] text-center border rounded hover:shadow hover:shadow-inner hover:border-black"
                  placeholder="Default value?"
                />
                <button 
                onClick={() => {
                  setKeys((prevKeys) => 
                    prevKeys.map((item) => 
                      item.key === key.key ? {...item, include: !item.include} : item
                    )
                  )
                }}
                  className={`${!key.include ? "bg-black text-white" : "bg-white "} w-[150px] border rounded-lg p-1 hover:shadow hover:shadow-inner hover:border-black`}
                  >
                  {!key.include && "Dis"}Include?
                </button>                
              </div>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </ul>

      <button
        className="h-[30px] w-[150px] flex justify-center items-center border rounded-lg p-1 m-auto hover:shadow hover:shadow-inner hover:border-black"
        onClick={addNewKey}
      >
        New Column?
      </button>
    </main>
  );
}
