"use client"

import { useState } from "react"
import userData from "../DUMMYDATA/DummyData.json"
import storeData from "../DUMMYDATA/DummyStoreData.json"

const tablesTable: string[] = ['userData', 'storeData', "computerData"]

export default function Import({ setImportedData }: { setImportedData: (data: any) => void }) {
    const [tables, setTables] = useState<string[]>([])
    const [error, setError] = useState("")

    function importData(tableChoice: string){
        switch (tableChoice) {
            case "userData":
                setImportedData(userData)    
                setError("")    
                break;
            case "storeData":
                setImportedData(storeData)
                setError("")    
                break;
            default:
                setError("Improper table choice")
                break;
        }
    }

    function callTables(){
        if (tablesTable.length > 0){
            setTables(tablesTable)
        }
    }

    return (
        <main
            className="flex w-full h-full"
        >
            <ul className="overflow-auto flex w-[80%] justify-evenly">
                {tables.map((table: string, index: number) => (
                    <div key={index} className="flex flex-col justify-center items-center">
                        <button
                            className="border rounded-lg text-center p-2 hover:shadow hover:shadow-white hover:border-black shadow"
                            onClick={() => importData(table)}
                        >
                            Import {table}
                        </button>            
                    </div>
                ))}          
            </ul>
            {error && (
                <p
                    className="h-full flex justify-center items-center animate-pulse"
                >
                    {error}
                </p>
            )}
            <div
                className="flex flex-col justify-evenly h-full"
            >
                <input 
                    className="border flex rounded text-center"
                    type="text" id="TableChoice" placeholder="CHOOSE DATABASE"
                />
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
        </main>
    )
}
