import { useState, useEffect } from 'react';

export const TsPractice1: React.FC = () => {
    // string型
    let str: string = 'A';
    str = 'String';
    // str = 10; // エラー

    // number型
    let num: number = 0;
    num = 10;
    // num = '10'; // エラー

    // boolean型
    let bool: boolean = true;
    bool = false;
    // bool = 10; // エラー

    // Array型
    // :Array<型名>　または　:型名 []で指定
    const arr1: Array<number> = [0, 1, 2]; // <型名> => ジェネリクスと呼ばれる
    let arr2: number[] = [3, 4, 5];
    arr1.push(10);
    arr2.push(20);
    // arr1.push('10'); // エラー
    // arr2 = 20; // エラー

    // null型
    let null1: null = null;
    null1 = null;
    // null1 = 10; // エラー

    // undefined型
    let undefined1: undefined = undefined;
    undefined1 = undefined;
    // undefined1 = 10; // エラー

    // null型もundefined型も単体で使用することはなく文字列と複合で使用したりする

    // any型
    // なるべく避けたい型指定　開発段階で定まっていない時にとりあえずany指定して進めるのが一般的
    let any1: any;
    any1 = false;
    any1 = 10;
    any1 = 'どんな型でも入れられる';

    // 関数型
    // { 引数: 引数の型名 }: 返却値の型名 => {}
    const funcA = (num: number): number => {
        return num;
    }
    console.log(funcA(10));
    // console.log(funcA('String')); // エラー
    // console.log(funcA());// エラー

    // オブジェクト型
    // : { : 型名, : 型名,  }
    const obj: { str: string, num: number } = {
        str: "A",
        num: 10,
    }
    obj.str = 'B';
    obj.num = 20;
    // obj.str = 20; // エラー
    // obj.num = 'B'; // エラー

    return (
        <>
            <h2>基本的な型の種類</h2>
            <div>
                <h3>string型</h3>
                <p>{str}</p>
            </div>
            <div>
                <h3>number型</h3>
                <p>{num}</p>
            </div>
            <div>
                <h3>boolean型</h3>
                <p>{bool ? 'true' : 'false'}</p>
            </div>
            <div>
                <h3>Array型</h3>
                {arr1.map((item, index) => <p key={index}>{item}</p>)}
                {arr2.map((item, index) => <p key={index}>{item}</p>)}
            </div>
            <div>
                <h3>null型</h3>
                <p>{!null1 && 'null'}</p>
            </div>
            <div>
                <h3>undefined型</h3>
                <p>{!undefined1 && 'undefined'}</p>
            </div>
            <div>
                <h3>any型</h3>
                <p>{any1}</p>
            </div>
            <div>
                <h3>関数型</h3>
                <p>{funcA(10)}</p>
            </div>
            <div>
                <h3>オブジェクト型</h3>
                <p>{obj.str}</p>
                <p>{obj.num}</p>
            </div>
        </>
    );
}

export const TsPractice2: React.FC = () => {
    // 複合的な型
    // intersection(交差)型
    // const obj: { str: string } & { num: number } = {
    //     str: 'A',
    //     num: 10,
    // }
    // obj.str = 'B';
    // obj.num = '10'; // エラー

    // 同じプロパティが存在する場合
    // type
    type TypeA = {
        str: string;
        num: number;
    }
    type TypeB = {
        str: string;
        bool: boolean;
    }
    type TypeC = TypeA & TypeB;
    const obj: TypeC = {
        str: 'C',
        num: 30,
        bool: true,
    }

    // union(合併・共用)型 ※使いすぎに注意
    let val1: string | number = '';
    val1 = 'A';
    val1 = 10;
    // val1 = [1, 2, 3];　// エラー

    // interface
    interface TypeD {
        str: string;
        num: number;
        bool: true,
    }
    const obj2: TypeD = {
        str: 'D',
        num: 40,
        bool: true,
    }

    // ジェネリクス
    type CustomType<T> = {
        str: T,
    }
    const strObj: CustomType<string> = { str: 'A' };
    // useStateでジェネリクスを使用した例
    const [str, setStr] = useState<string>('A');
    useEffect(() => {
        setStr('B');
    }, []);

    return (
        <>
            <h2>複合的な型</h2>
            <div>
                <h3>intersection(交差)型</h3>
                { obj.bool ? <p>type: {obj.str} - {obj.num}</p> : <p>false</p> }
            </div>
            <div>
                <h3>union(合併・共用)型</h3>
                <p>{val1}</p>
            </div>
            <div>
                <h3>その他</h3>
                { obj2.bool && <p>interface: {obj2.str} - {obj2.num}</p> }
            </div>
            <div>
                <h3>ジェネリクス</h3> 
                <p>{strObj.str}</p>
                <p>{str}</p>
            </div>
        </>
    );
}