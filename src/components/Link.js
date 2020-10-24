// サイトURLを変える度に、DOMをすべてリロードしなおさないように設定するために作成
import React from 'react';

// childrenはRoute.jsで<link></Link>の中にいれたもの
const Link = ( { className, href, children} ) => {
const onClick = (event) => {
    // クリックしたときに、そのページを違うタブで開かせたい。
    // if(Mactのkey(左)or Windowsのkeyがtrueのとき)そのまま返って、以下のevent.preventやwindow-の関数は実行しない
    if(event.metaKey || event.ctrlKey){
        return;
    }

    event.preventDefault()

    // URLを第三引数に指定したものに変えれる関数。
    // これだけでページが飛べるようになるわけではないが、対象のものをクリックしたときに、URLが第三引数のものに変わる。
    window.history.pushState({}, '', href)

    // 以下の関数の意味はそんなに気にしなくて良い
    // ULRが変わったことをRouteコンポーネントにしらせるために使うことだけ理解しておく◎
    const navEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navEvent);
};

return <a onClick={onClick} className={className} href={href} > {children}　</a>;
};

export default Link;
