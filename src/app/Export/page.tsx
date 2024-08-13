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
        setKeyDataCollect(keyData);
        console.log(keyData);
    }, [keyData]);

    return (
        <main className="max-h-[80vh] overflow-auto">
            <ul className="flex w-full justify-evenly items-center divide-y">
                {keyDataCollect.map((key: KeyStruc, index: number) => key.include && (
                    <li
                        key={index}
                        className="flex flex-col justify-center items-center m-auto w-full"
                    >
                        <h2 className="h-[100px] w-full flex justify-center items-center">
                            {key.key} as {key.type}
                        </h2>
                        <div className="divide-y w-full flex flex-col justify-center items-center">
                            {userData.map((user: any, userIndex: number) => (
                                <div
                                    key={userIndex}
                                    className="h-[150px] w-full flex justify-center items-center"
                                >
                                    <div
                                        className="overflow-auto h-full flex justify-center items-center w-full border"
                                    >
                                        {user[key.key] !== undefined ? user[key.key] : key.defaultValueToEnter}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default Export;
