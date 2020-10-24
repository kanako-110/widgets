import {useEffect, useState} from 'react' 

const Route = ( {path, children} ) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)

    // []は初回レンダー時のみ
    useEffect(()=> {
        const onLocationChange = () => {
            // defaultと同じ内容=アップデートするように指定しているだけ
            setCurrentPath(window.location.pathname)
        }
        // popstate（戻るや進むボタン?)を監視。onLo-の関数を実行
        window.addEventListener('popstate', onLocationChange)

        return() => {
            window.removeEventListener('popstate', onLocationChange)
        };
    }, [])

    // childrenとは、app.jsでこのコンポーネント・<route></route>が囲った子コンポーネントのこと
    // よって以下の式は、pathNameがpropsのpathと同じとき、子コンポーネントのchildrenをdisplay otherwise,null
    return currentPath === path
    ? children
    : null
};

export default Route;