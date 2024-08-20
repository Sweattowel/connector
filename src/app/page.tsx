"use client"


import { useState } from "react";
import TransformData from "./Transform/Page";
import Export from "./Export/page";
import Import from "./IMPORT/page";

const tablesTable: string[] = ['userData', 'storeData', "computerData"]

export default function Home() {
  const [importedData, setImportedData] = useState<any[]>([])
  const [newKeys, SetNewKeys] = useState([])



  return (
    <main className="flex min-h-[250vh] flex-col items-center justify-evenly p-24 bg-black">      
      <section 
          className="border border-white p-5 rounded-lg h-[150px] w-[80vw] flex text-white"
      >
        <Import setImportedData={setImportedData}/>
      </section>
      <section className="border  w-[90vw] bg-white rounded-lg">
        <h2
          className="font-bold text-center w-full border-b h-[50px] flex justify-center items-center"
        >
          Display data
        </h2>
        {importedData.length > 0 &&
          (
            <div
              className="flex flex-row justify-evenly items-center h-[50px] w-[calc(90vw-1px)] rounded-t-lg absolute bg-white"
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
                        {typeof(value) == "boolean" ? `${value ? "True" : "false"}` : value}
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
            <TransformData 
              exportNewKeys={(data) => 
                SetNewKeys(data)
              } 
              data={importedData}
            />
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
          <Export 
            keyData={newKeys} 
            dataToUse={importedData}
          />
      </section>
    </main>
  );
}
