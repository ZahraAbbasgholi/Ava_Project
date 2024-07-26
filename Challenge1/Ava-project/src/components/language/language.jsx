import React from 'react';
import './language.css';
import '../SpeechConversion/SpeechConversion.css';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const language = () => {
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["فارسی"]));

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
    );

    return (
        <>
            <div className='language-style'>
                <div>:زبان گفتار</div>
                <td /><td />
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                            className="capitalize dropdown-button"
                        >
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                        className='dropdown-items-groups'
                    >
                        <DropdownItem className='dropdown-items' key="فارسی">فارسی</DropdownItem>
                        <DropdownItem className='dropdown-items' key="انگلیسی">انگلیسی</DropdownItem>
                    </DropdownMenu>
                </Dropdown>


            </div>
        </>
    )
}

export default language