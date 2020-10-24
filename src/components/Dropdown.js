import React, {useState, useEffect, useRef} from 'react';


const Dropdown = ( {label, options, selected, onSelectedChange} ) => {
    // false=閉じている状態
    const [open, setOpen] = useState(false)
    // usRefはDOM内容を参照するために使う
    const ref = useRef()

    const Text = () => {
        if(selected.value === "red"){
            return <p style={{color:"red"}}>This text is Red!</p>;
        }if(selected.value === "blue"){
            return <p style={{color:"blue"}}>This text is blue!</p>;
        }if(selected.value === "green"){
            return <p style={{color:"green"}}>This text is green!</p>;
        }
    };



    useEffect( () => {
        const onBodyClick =  (event) => {
             // if refの中身(div ui form以降～div menu)すべて)がクリック(event.target)されたら、引き返す
            // それ以外(div ui from 以降ではない場所)がクリックされたらsetOpen(false)=閉じるを実行
            if(ref.current.contains(event.target)){
                return;
            }
            setOpen(false)
        };

        document.body.addEventListener('click', onBodyClick );

        // useEffect内のreturnが実行されるときは２パターン
        // １：二かいめのrenderingの時に初めて呼び出される。呼びだされるのは、上の関数が呼び出される直前（前回習った内容)
        // ２：このコンポーネント全体の関数「Dropdown」の全てが消えたとき。
        // つまり、app.jsでDropdownがnullにされたとき、このreturnが返されて、上からまたレンダリングされる。
        return () => {
            document.body.removeEventListener('click', onBodyClick)
        };

    }, [] );

    // arrayを返すには....mapでまず広げる
    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
             return null;
        }

        return(
            <div 
            key={option.label} 
            className="item"
            onClick={()=>{onSelectedChange(option)}}
            >
                {option.label}
                </div>
        );
    } );


return (
    // refによってそれ以下のhtml全てを参照できる？
    // 左：新しい変数名=右：すでに定義した、useRef()が入ってる変数ref
    <div ref={ref} className="ui form">
    <div className="field">
    <label className="label"> {label} </label>
    <div 
    // openとは逆のモノtrueを入れ、開くようにしている
    onClick={() => setOpen(!open)}
    // openがtrue=開いてるときは、visible activeを付けたす
    className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
        <i className="dropdown icon"></i>
        <div className="text"> {selected.label} </div>
        <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
        </div>
    </div>
    <div>
        {Text()}
    </div>
</div>
</div>
)
};

export default Dropdown