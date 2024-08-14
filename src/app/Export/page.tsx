'use client';
import userData from "../DUMMYDATA/DummyData.json";
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
    const [keyDataCollect, setKeyDataCollect] = useState<KeyStruc[]>([]);

    useEffect(() => {
        const newKeyData = userData.map((user: any) => 
            keyData.reduce((acc, key) => {
                if (key.include) {
                    acc[key.key] = user[key.key] !== undefined ? user[key.key] : key.defaultValueToEnter;
                }
                return acc;
            }, {} as Record<string, any>)
        );
        console.log(newKeyData);
        setKeyDataCollect(newKeyData);
    }, [keyData]);

    return (
        <main className="max-h-[80vh] overflow-auto">
            <ul className="flex flex-col w-full justify-evenly items-center divide-y">
                <div
                    className="flex w-full h-[100px] shadow-lg"
                >
                    {keyData.map((key: KeyStruc, index: number) => key.include && (
                        <div
                            className="h-full w-full flex justify-center items-center"
                            key={index}
                        >
                            {key.key}
                        </div>
                    ))}
                </div>
                {keyDataCollect.map((data: any, index: number) => (
                    <li
                    className="flex h-[150px] w-full"
                        key={index}
                    >
                        {Object.entries(data).map(([k, v]) => (
                            <div
                                key={k}
                                className="h-full w-full overflow-auto flex justify-center items-center"
                            >
                                {v}
                            </ div>
                            
                        ))}
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default Export;
/*
{keyData.map((key: KeyStruc, index: number) => key.include && (
                    <li
                        key={index}
                        className="flex flex-col justify-center items-center m-auto w-full"
                    >
                        <h2 className="h-[100px] w-full flex justify-center items-center">
                            {key.key}: {key.type}
                        </h2>
                        <div className="divide-y w-full flex flex-col justify-center items-center">
                            {keyDataCollect.map((user: any, userIndex: number) => (
                                <div
                                    key={userIndex}
                                    className="h-[150px] w-full flex justify-center items-center"
                                >
                                    <div
                                        className="overflow-auto h-full flex justify-center items-center w-full border"
                                    >
                                        {user[key.key]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
*/