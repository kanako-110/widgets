import React, {useState} from 'react'

const Accordion = ( {items} ) => {
    // functionコンポーネントのstate管理法
    const [activeIndex, setActiveIndex] = useState(null);


        const onTitleClick = index => {
            setActiveIndex(index);
        };

    const renderedItems = items.map( (item, index) => {
        const active = index===activeIndex ? 'active': '';

        return (
            <React.Fragment key={item.title}>
                <div 
                className={`title ${active}`}
                // onClick=()←これがないと、renderが起こるたび(クリックしてないのに!)onClickの内容が出力される。
                // ()を置いておくことで、somewhere in the futureに実行させることができるようになる。
                onClick={()=> onTitleClick(index) }
                >
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p> {item.content} </p>
                </div>
            </React.Fragment>
        )
    }

    )
    return(
         <div className="ui styled accordion">
             {renderedItems}
              </div>
    )
};

export default Accordion