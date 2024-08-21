"use client"


import { useState } from "react";
import TransformData from "./Transform/Page";
import Export from "./Export/page";
import Import from "./IMPORT/page";
import DisplayData from "./Display/page";

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
        <DisplayData importedData={importedData} />
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
