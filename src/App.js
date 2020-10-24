import React, {useState} from 'react';
import Accordion from './components/Accordion';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './components/Route';
import Header from './components/Header'


const items = [
    {
        title: 'What is React?',
        content: 'React is a front end js framework'
    },
    {
        title: 'Why React?',
        content: 'React is a favorite JS library'
    },
    {
        title: 'How do you use React?',
        content: 'You use React by creating components'
    }
]

const options = [
    {
        label:"The Color Red",
        value:"red"
    },
    {
        label:"The Color Blue",
        value:"blue"
    },
    {
        label:"A Shade of Green",
        value:"green"
    },
]



export default () => {
    // stateが使われる関数内で定義するぽい？
    const [selected, setSelected] = useState(options[0]);
    // const [showDropdown, setShowDropdown] =useState(true);

    return (
         <div>
             <Header />
             <Route path='/' >
                 <Accordion items={items}/>
             </Route>
             <Route path='/list'>
                 <Search />
             </Route>
             <Route path='/dropdown'>
                 <Dropdown
                    label="Select a color"
                    options={options}
                    selected={selected}
                    onSelectedChange={setSelected}
                 />
             </Route>
             <Route path='/translate'>
                <Translate />
             </Route>
             {/* <button onClick={() => setShowDropdown(!showDropdown) }>Toggle Dropdown</button> */}
             {/* { showDropdown ? 
            <Dropdown 
            label="Select a Color"
            options={options}
            selected={selected}
            onSelectedChange={setSelected}
            /> : null
             } */}
         </div>
    )
};