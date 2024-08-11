"use client"
import userData from "./DUMMYDATA/DummyData.json"
import { useState } from "react";
import TransformData from "./DUMMYDATA/Transform/Page";
/*
  Data format needs to be fluid so as to handle anything for conversion


*/

interface dataStruc
{
  name: string,
  language: string,
  id: string,
  bio: string,
  version: number
}
const tablesTable: string[] = ['userData', 'storeData', "computerData"]

export default function Home() {
  const [importedData, setImportedData] = useState<any[]>([])
  const [tables, setTables] = useState<string[]>([])

  function importData(){
    setImportedData(userData)
  }
  function callTables(){
    if (tablesTable.length > 0){
      setTables(tablesTable)
    }
  }
  return (
    <main className="flex min-h-[150vh] flex-col items-center justify-evenly p-24 bg-black">      
    <section 
        className="border border-white p-5 rounded-lg h-[10vh] w-[80vw] flex text-white"
      >
        <ul
          className="overflow-auto flex w-[80%] justify-evenly"
        >
          {tables.map((table: string, index: number) => (
            <div 
              className="flex flex-col justify-center items-center "
            >
              <button
                className="border rounded-lg text-center p-2 hover:shadow hover:shadow-white hover:border-black shadow"
                onClick={() => importData()}
              >
                Import {table}
              </button>            
            </div>
          ))}          
        </ul>
        <div>
          <button
            className="border rounded-lg text-center p-2 hover:bg-black hover:text-white w-full"
            onClick={() => callTables()}
          >
            Import tables
          </button>
          <button
            className="border rounded-lg text-center p-2 hover:bg-black hover:text-white w-full"
            onClick={() => callTables()}
          >
            Export data
          </button>
        </div>

      </section>
      <section className="border  w-[90vw] bg-white rounded-lg">
        <h2
          className="font-bold text-center w-full border-b h-[50px] flex justify-center items-center"
        >
          View data
        </h2>
        {importedData.length > 0 &&
          (
            <div
              className="flex flex-row justify-evenly items-center h-[50px] w-[90vw] rounded-t-lg absolute bg-white"
            >
              {Object.entries(importedData[0]).map(([key, value], index: number) => (
                <div
                  className={`flex-1 h-[100%] flex flex-col items-center shadow-xl justify-center`}
                  key={index}
                >
                  {key}
                </div>
              ))}
            </div>            
          )
        }

          <div className={`${importedData.length > 0 && "mt-[52px]"} max-h-[80vh] overflow-auto divide-y`}>
            {importedData.length > 0 ? (
              importedData.map((data: any, index: number) => (
                <li
                  className="flex flex-row justify-evenly items-center h-[150px]"
                  key={index}
                >
                  {Object.entries(data).map(([key, value]: any, i) => (
                    <div
                      className={`flex-1 h-[100%] flex flex-col items-center`}
                      key={i}
                    >
                      <div
                        className={`${
                          value.length > 30 ? "overflow-auto text-center text-[0.7rem] p-1 " : "p-1"
                        } text-wrap w-[100%] h-full text-wrap flex justify-center items-center`}
                      >
                        {value}
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
      </section>
      <section
        className="bg-white w-[90vw] rounded p-5"
      >
        <h2
          className="font-bold text-center w-full border-b"
        >
          Transform data
        </h2>
        <div>
          {importedData && importedData.length > 0 && (
            <TransformData data={importedData}/>
          )}
          
        </div>
      </section>
      <section
        className="bg-white w-[90vw] rounded p-5"
      >
        <h2
          className="font-bold text-center w-full border-b"
        >
          Export Data
        </h2>

      </section>
    </main>
  );
}
