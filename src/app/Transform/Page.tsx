"use client";

import { useEffect, useState } from "react";
import DropDown from "./Components/DropDown";
interface columnStruc {
  key: string,
  value: any,
  defaultValueToEnter: string,
  type: string,
  include: boolean,
  takeFrom: boolean,
  takeFromWhere: string,
  error: string
}

const itemTypes = [
  "number",
  "string",
  "boolean",
  "float",
]
export default function TransformData({ data }: { data: any }) {
  const [seeDropDownMenu, setSeeDropDownMenu] = useState("")
  const [keys, setKeys] = useState<any[]>([]);

  function handleShowMenu(key: string){
    setSeeDropDownMenu(key)
  }

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
                  className={`${(key.error === "Duplicate Key") || (key.key === "") && "bg-red-600 animate-pulse"} w-[200px] text-center border rounded hover:shadow hover:shadow-inner hover:border-black`}
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
                  <button 
                    onClick={() => {
                      if (key.key === ""){
                        setSeeDropDownMenu("")
                        return
                      }
                      handleShowMenu(key.key)
                    }}
                    className="w-[100px] border rounded-lg p-1 hover:shadow hover:shadow-inner hover:border-black">
                    {key.type}
                  </button>
                  {seeDropDownMenu === key.key && key.key !== "" &&
                    <DropDown 
                      menuItems={itemTypes} 
                      handleDropDownSubmit={(newTypeToEnter) => {
                        setSeeDropDownMenu("")
                        setKeys((prevKeys) => 
                          prevKeys.map((item) => 
                            item.key === key.key ? {...item, type: newTypeToEnter} : item
                          )
                        )
                      }}
                    />
                  }
                  
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
                {key.takeFrom ? 
                (
                  <input 
                    type="text" 
                    className="w-[200px] text-center border rounded hover:shadow hover:shadow-inner hover:border-black"
                    placeholder="Take from where?"
                    onChange={(e) => 
                      setKeys((prevKeys) => 
                        prevKeys.map((item) => 
                          item.key === key.key ? {...item, takeFromWhere: e.target.value} : item
                        )
                      )
                    }
                  />                    
                )
                :
                (
                  <input 
                    type="text" 
                    className="w-[200px] text-center border rounded hover:shadow hover:shadow-inner hover:border-black"
                    placeholder="Default value?"
                    onChange={(e) => 
                      setKeys((prevKeys) => 
                        prevKeys.map((item) => 
                          item.key === key.key ? {...item, defaultValueToEnter: e.target.value} : item
                        )
                      )
                    }
                  />                  
                )
                }

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
