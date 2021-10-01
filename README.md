# React × TypeScript
　
### 使用したもの
- create-react-app "react": "^17.0.2"
- "typescript": "^4.4.3",
- json-server
 
```zsh
$ git clone https://github.com/d-mori-src/react-ts-211001.git
$ cd react-ts-211001
$ npm install
$ npm start

# json-server起動(ローカルDB)
$ npm run json-server
```
　
## 【資料】 3 APIで取得する型定義の概要
　
#### json-server設定(ローカルAPI)
 
```zsh
$ npm install json-server
# 公式ではグローバルにインストール　npm install -g json-server
```
　
ルートディレクトリに`db.json`を作成
　
```json
{
  "users": [
    { "id": 1, "name": "mori", "age": 39, "personalColor": "blue" },
    { "id": 2, "name": "yamada", "age": 50, "personalColor": "green" },
    { "id": 3, "name": "sato", "age": 20, "personalColor": "red", "hobbies": ["game", "soccer"] }
  ]
}
```
　
`package.json`
　
```json
  "scripts": {
    // 以下追加
    "json-server": "json-server --watch db.json --port 3001" // port3000はReactのサーバーとバッティングするので変更
  },
```
　
`json-server`起動
　
```zsh
$ npm run json-server
```
[http://localhost:3001/users](http://localhost:3001/users)
　
#### 型定義の設定
　
ルートディレクトリに`types/user.ts`を作成(名称任意)
※型定義ファイルは1箇所にまとめておくと見通しが良くなり管理しやすい
　
```ts
export type User = {
    id: number;
    name: string;
    age: number;
    personalColor?: string; // <プロパティ名>?　 string | undefined と同義　※「?」をつけると未定義でもエラーにならない
    hobbies?: string[];
}
```
　
#### APIをFetch
　
```tsx
import { useState, useEffect } from 'react';

const Index: React.FC = () => {
    const [ users, setUsers ] = useState<User[]>([]);
    
    useEffect(() => {
        // Fetch URLを記載
        axios.get<User[]>('http://localhost:3001/users').then((res) => {
            setUsers(res.data);
        });
    }, []);

    return (
        <main>
            {/* jsxで展開 */}
            {users.map((user, index) => (
                <div key={index}>{/* keyは必ず指定 */}
                {/* Propsで送る */}
                <ListItem
                    id={user.id}
                    name={user.name}
                    age={user.age}
                    personalColor={user.personalColor}
                    hobbies={user.hobbies}
                />
                </div>
            ))}
        </main>
    );
}
```
　
#### 子コンポーネントに受け渡し
　
```tsx
// 型定義ファイルを読み込み
import { User } from '../types/user';

export const ListItem: React.FC<User> = (props) => {
    const { id, name, age, personalColor, hobbies } = props; // 分割代入で取得

    return (
        <p style={{ color: personalColor }}>
            {id}: {name}({age}) {hobbies?.join(" / ")}
        </p>
    );
}
```