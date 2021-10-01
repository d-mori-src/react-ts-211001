import { useState, useEffect } from 'react';
import axios from 'axios';
import { TsPractice1, TsPractice2 } from '../components/TsPractice';
import { ListItem } from '../components/ListItem';
import { User } from '../types/user';

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
      <h1>TypeScriptの基本</h1>
      <TsPractice1 />
      <TsPractice2 />

      <h1>API取得</h1>
      {users.map((user, index) => (
        <div key={index}>
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

export default Index;