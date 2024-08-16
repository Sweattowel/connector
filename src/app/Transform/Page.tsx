"use client";

import { useEffect, useState } from "react";
import DropDown from "./Components/DropDown";
interface keyStruc {
  ID: boolean,
  key: string,
  value: any,
  defaultValueToEnter: string,
  type: string,
  include: boolean,
  takeFrom: boolean,
  takeFromWhere: string,
  takeWhat: string,
  error: string
}

const itemTypes = [
  "number",
  "string",
  "boolean",
  "float",
]
interface importStruc {
  data: any,
  exportNewKeys: (data: any) => any;
}
export default function TransformData({ data, exportNewKeys }: importStruc) {
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
          ID: false,
          key: key, 
          value: "",
          defaultValueToEnter: "",
          type:typeof(value),
          include: true,
          takeFrom: false,
          takeFromWhere : "",
          takeWhat: "",
          error: ""
        });
      }
      setKeys(newKeys);
    }
  }, [data]);

  const addNewKey = () => {

    const updatedKeys = [...keys, 
      {
        ID: false,
        key: `Key N*${keys.length + 1}`,
        type: "string",
        include: true,
        takeFrom: false,
        takeFromWhere: "",
        takeWhat: "",
        error: ""
      }
    ];

    setKeys(updatedKeys);
  };
/**
  ID: boolean,
  key: string,
  value: any,
  defaultValueToEnter: string,
  type: string,
  include: boolean,
  takeFrom: boolean,
  takeFromWhere: string,
  takeWhat: string,
  error: string

 */
  return (
    <main className="min-h-[32vh] flex flex-col justify-evenly">
      <ul className="flex flex-col flex-wrap divide-y mb-2">
        {keys.length > 0 ? (
          keys.map((key: keyStruc, index: number) => (
            <div
              className={`${key.ID && !key.include && "animate-pulse bg-red-600"} flex-1 h-[100%] max-w-[100%] flex flex items-center justify-center p-1`}
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
                      if (key.key === "" || seeDropDownMenu === key.key){
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
                  <div
                    className="flex flex-col"
                  >
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
                    {key.type == "boolean" ? (
                      <button
                        className="hover:opacity-60 border"
                        onClick={() => 
                          setKeys((prevKeys) => 
                            prevKeys.map((item) => 
                              item.key == key.key ? {...item, takeWhat: key.takeWhat ? false : true} : item
                            )
                          )
                        }
                      >
                        {key.takeWhat ? 'True' : 'False'}
                      </button>
                    ) : (
                      <input 
                        type={`${key.type}`}
                        className="w-[200px] text-center border rounded hover:shadow hover:shadow-inner hover:border-black"
                        placeholder="Take What from where?"
                        onChange={(e) => 
                          setKeys((prevKeys) => 
                            prevKeys.map((item) => 
                              item.key === key.key ? {...item, takeWhat: e.target.value} : item
                            )
                          )
                        }
                      />                          
                    )}
                    
                  </div>
                
                )
                :
                (
                  <>
                    {key.type !== "boolean" && (
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
                    )}     
                    {key.type == "boolean" && (
                      <button
                        className="hover:opacity-60 border w-[200px] text-center border rounded hover:shadow hover:shadow-inner hover:border-black"
                        onClick={() => 
                          setKeys((prevKeys) => 
                            prevKeys.map((item) => 
                              item.key == key.key ? {...item, takeWhat: key.takeWhat ? false : true} : item
                            )
                          )
                        }
                      >
                        {key.takeWhat ? 'True' : 'False'}
                      </button>
                      )}              
                  </>
               
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
                <button 
                onClick={() => {
                  setKeys((prevKeys) => 
                    prevKeys.map((item) => 
                      item.key === key.key ? {...item, ID: true} : {...item, ID: false}
                    )
                  )
                }}
                  className={`${key.ID ? "bg-black text-white" : "bg-white "} w-[150px] border rounded-lg p-1 hover:shadow hover:shadow-inner hover:border-black`}
                  >
                  {key.ID ? "ID SET" : "Set as ID?"}
                </button>             
              </div>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </ul>
        <section
          className="flex border-t w-[60%] h-[50px] m-auto justify-center items-center"
        >
          <button
            className="h-[30px] w-[150px] flex justify-center items-center border rounded-lg p-1 m-auto hover:shadow hover:shadow-inner hover:border-black"
            onClick={addNewKey}
          >
            New Column?
          </button>
          <button
            className="h-[30px] w-[150px] flex justify-center items-center border rounded-lg p-1 m-auto hover:shadow hover:shadow-inner hover:border-black"
            onClick={() => {
              exportNewKeys(keys)
            }}
          >
            SetNewKeys?
          </button>          
        </section>
      
    </main>
  );
}
