interface DropDownProps {
    menuItems: string[];
    handleDropDownSubmit: (item: string) => void;
}

const DropDown = ({ menuItems, handleDropDownSubmit }: DropDownProps) => {
    return (
        <main
            className="absolute bg-white flex flex-col w-[80px] h-[150px] border rounded text-center justify-center items-center"
        >
            <ul
                className="divide-y "
            >
                {menuItems.map((item: string, index: number) => (
                    <button  
                        key={index}
                        className="hover:bg-black hover:text-white w-[80%] p-1 rounded"
                        onClick={() => handleDropDownSubmit(item)}>
                        {item}
                    </button>
                ))}
            </ul>
        </main>
    );
}

export default DropDown;
