import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('programming');
    const [results, setResults] = useState([]);


    // async()=>はuseEffectには使えない。classComponentのときのみ
    // なので、使えるように新しく関数searchを作っちゃう！
    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php',{
                params: {
                    action: 'query',
                    list: 'search',
                     origin: '*',
                    format: 'json',
                    srsearch: term,
                },
            } );
            setResults(data.query.search)
        };
        // そしてそのsearch関数をすぐに呼び出す
        // が、最初のprogrammingのページの時にも10秒関数実行を待つのは嫌だ
        //そこで、if(termが書いてあって、results.lengthがまだない(初期値)のとき)関数searchをすぐする、それ以外は1秒まつのif文をつくる
        if (term && !results.length) {
            search()
        } else {
            const timeoutId = setTimeout( () => {
                // if(termがtrue=何か入っているときのみ)=>空欄にしたときに関数searchがレンダリングされなくなり、エラーがでない
                if(term){
                search();
                };
            },1000);
            return () => {
                clearTimeout(timeoutId)
            };
        }

        // useEffectの中でreturnは一度だけ使える
        // そしてそのreturnの中身は、２回目のレンダーから、一番最初に呼び出られる。
        // 初回レンダー後：上記の関数timeoutIdが実行される。が、termの中身が変更されて。２度目のレンダー後：render内の関数clearTimeoutが最初に実行され、timeoutIdが消される。そしてまたtimeoutIdが新たに実行される。３：clearTimeout->timeoutId 4:-
      
        // [term]によって、レンダリングされるたびに&termの中身がアップデートされるたびに、この関数が実行されることになる
        // first renderも含めて。
    }, [term]);
    
    //=>API情報取得
    // NEXT:mapで広げる！！
    const renderedResults = results.map( (result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a 
                        className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                        >
                        Go
                        </a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={ {__html: result.snippet} }></span>
                </div>
            </div>
        );
    } );


    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input 
                    className="input"
                    value={term}
                    onChange={e => setTerm(e.target.value)} 
                    />
                </div>
            </div>
            <div className="ui celled list"> {renderedResults} </div>
        </div>
    );
};

export default Search;