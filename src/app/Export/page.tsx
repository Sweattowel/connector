const Export = ({keyData} : any) => {
    return (
        <main>
            <ul 
                className="flex w-full justify-evenly items-center divide-x"
            >
                {keyData.map((arg :any, index: number) => (
                    <li
                        key={index}
                        className="flex justify-center items-center m-auto"
                    >
                        {arg.key}
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default Export