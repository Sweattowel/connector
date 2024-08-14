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
    };

    return (
        <main className="max-h-[80vh] overflow-auto">
            <ul className="flex flex-col w-full justify-evenly items-center divide-y ">
                <div className="flex w-full h-[100px] ">
                    {keyData.map((key: KeyStruc, index: number) => key.include && (
                        <div
                            className="h-full w-full flex justify-center items-center "
                            key={index}
                        >
                            {key.key}
                        </div>
                    ))}
                </div>
                {keyDataCollect.map((data: any, index: number) => (
                    <li className="flex h-[150px] w-full" key={index}>
                        {Object.entries(data).map(([key, value]) => (
                            <div
                                className="w-full"
                                key={key}
                            >
                                {value.ID ? (
                                    <h2
                                        className="h-full w-full overflow-auto flex justify-center items-center text-center"
                                    >
                                        {value.value}
                                    </h2>
                                ) : (
                                    <input
                                        
                                        className="h-full w-full overflow-auto flex justify-center items-center text-center"
                                        value={value.type !== 'boolean' ? value.value : value.type ? "true" : "false"}
                                        onChange={(e) => {
                                            if (value.ID){
                                                return
                                            }
                                            handleInputChange(index, key, e.target.value)
                                        }}
                                    />                                
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
