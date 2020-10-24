import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Convert = ({language, text} ) => {
    const [translated, setTranslated] = useState('');
    const [debouncedText, setDebouncedText] = useState(text);

    // useEffect#!: propsのtextが変更されたときに実行されるuseEffect
    useEffect  ( () => {
        // textの内容をセットする(setDebounce-)にするのを、500msまつ
        const timerId = setTimeout(() => {
            setDebouncedText(text)
        },1000);
        // ただし、2ndレンダリングのとき=すぐにtextが変更されたときは、タイムセットを消去して、またイチからスタートさせる
        return () => {
            clearTimeout(timerId)
        };
    }, [text] );

    //value(langとtext)がアップデートされたら、APIを取得したい。=useEffectを使うとき！
    
    // useEffect#2: debouncedTextが変更されたときに実行する関数
    useEffect( () => {
        // // １APIにリクエスト
        // ２API取得後、内容を参照できるようにするために、asyncが必要。async→await→cont responseの順番で追加
        // 今回はhelperFunctionを作って、そのなかにasync()~をいれてる

        // post通信の第二引数はapiに送る内容?
        // 第３引数がapiよりfetchするもの
        const doTranslation = async() => {

            const { data } = await axios.post
            ('https://translation.googleapis.com/language/translate/v2',
            {},
            {
            params: {
                // qはtranslateしたい内容
                // targetは、翻訳したい言語名
                q: debouncedText,
                target: language.value,
                key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
    
            },
            });

            setTranslated(data.data.translations[0].translatedText);
        }


        doTranslation()
        // 第二引数：初回レンダー時と、lang textが更新されるたびに実行、を指示している。
    }, [language, debouncedText])

 return (
     <div>
         <h1 className="ui header"> {translated} </h1>
     </div>
 )
};

export default Convert;