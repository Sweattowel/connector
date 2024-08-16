'use client';
import { useEffect, useState } from "react";

interface KeyStruc {
    ID: boolean;
    key: string;
    value: any;
    defaultValueToEnter: string;
    type: string;
    include: boolean;
    takeFrom: boolean;
    takeFromWhere: string;
    takeWhat: string;
    error: string;
}

interface ExportProps {
    keyData: KeyStruc[];
    dataToUse: any;
}

const Export = ({ keyData, dataToUse }: ExportProps) => {
    const [keyDataCollect, setKeyDataCollect] = useState<Record<string, any>[]>([]);

    useEffect(() => {
        if (!keyData || keyData.length === 0 || !dataToUse || dataToUse.length === 0) {
            console.log("failed");
            return;
        }
        setKeyDataCollect([])
        const newKeyData = dataToUse.map((data: any) =>
            keyData.reduce((acc, key) => {
                if (key.include) {
                    acc[key.key] = {
                        ...key, 
                        value: data[key.key] !== undefined ? data[key.key] : key.defaultValueToEnter
                    };
                }
                return acc;
            }, {} as Record<string, KeyStruc>)
        );
        console.log(newKeyData || "failed");
        setKeyDataCollect(newKeyData);
    }, [keyData, dataToUse]);

    const handleInputChange = (index: number, key: string, value: any) => {
        setKeyDataCollect((prevData) =>
            prevData.map((item, i) =>
                i === index
                    ? {
                        ...item,
                        [key]: {
                            ...item[key],
                            value: value,
                        },
                    }
                    : item
            )
        );
        console.log("Updated Data: ", keyDataCollect);
    };

    return (
        <main className="max-h-[80vh] overflow-auto">
            <ul className="flex flex-col w-full justify-evenly items-center divide-y ">
                <div className="flex w-full h-[100px] ">
                    {keyData.map((key: KeyStruc, index: number) => key.include && (
                        <div
                            className="h-full w-full flex justify-center items-center text-center"
                            key={index}
                        >
                            {key.key} {key.takeFrom && "From"} {key.takeFromWhere}
                        </div>
                    ))}
                </div>
                {keyDataCollect.map((data: any, index: number) => (
                    <li className="flex h-[150px] w-full" key={index}>
                        {Object.entries(data).map(([key, value] : any) => (
                            <div
                                className="w-full"
                                key={key}
                            >
                                {value.ID ? (
                                    <h2 className="h-full w-full overflow-auto flex justify-center items-center text-center">
                                        {value.value}
                                    </h2>
                                ) : (
                                    <>
                                        {value.takeFrom ? (
                                            <div
                                                className="flex justify-center items-center text-center h-full w-full"
                                            >
                                                {value.type === "boolean" && (
                                                    <button
                                                        className="hover:opacity-60 h-full w-full overflow-auto flex justify-center items-center text-center" 
                                                        value={value.takeWhat}
                                                        onClick={() => {
                                                            handleInputChange(index, key, !value.takeWhat);
                                                        }}
                                                    >
                                                        {value.value}
                                                    </button>
                                                )}     
                                                {value.type === "number" && (
                                                    <input
                                                        className="h-full w-full overflow-auto flex justify-center items-center text-center"
                                                        type="number"
                                                        value={value.takeWhat}
                                                        onChange={(e) => handleInputChange(index, key, e.target.value)}
                                                    />
                                                )}    
                                                {value.type === "string" && (
                                                    <input
                                                        className="h-full w-full overflow-auto flex justify-center items-center text-center"
                                                        type="text"
                                                        value={value.takeWhat}
                                                        onChange={(e) => handleInputChange(index, key, e.target.value)}
                                                    />
                                                )} 
                                            </div>
                                            
                                        ) : (
                                            <>
                                                {value.type === "boolean" && (
                                                    <button
                                                        className="hover:opacity-60 h-full w-full overflow-auto flex justify-center items-center text-center" 
                                                        value={value.value}
                                                        onClick={() => handleInputChange(index, key, !value.value)}
                                                    >
                                                        {value.value}
                                                    </button>
                                                )}     
                                                {value.type === "number" && (
                                                    <input
                                                        className="h-full w-full overflow-auto flex justify-center items-center text-center"
                                                        type="number"
                                                        value={value.value}
                                                        onChange={(e) => handleInputChange(index, key, e.target.value)}
                                                    />
                                                )}    
                                                {value.type === "string" && (
                                                    <input
                                                        className="h-full w-full overflow-auto flex justify-center items-center text-center"
                                                        type="text"
                                                        value={value.value}
                                                        onChange={(e) => handleInputChange(index, key, e.target.value)}
                                                    />
                                                )}                                                  
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default Export;
