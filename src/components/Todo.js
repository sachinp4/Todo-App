import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Todo({ user }) {
  const [text, setText] = useState('');
  const [mytodos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let dispose;
    if (user) {
      const docRef = db.collection('todos').doc(user.uid);
      dispose = docRef.onSnapshot((docSnap) => {
        if (docSnap.exists) {
          console.log(docSnap.data().todos);
          setTodos(docSnap.data().todos);
        } else {
          console.log("no docs");
        }
      }).dispose;
    } else {
      navigate('/login');
    }

    // Check if dispose is a function before calling it
    if (dispose && typeof dispose === 'function') {
      return () => {
        dispose();
      };
    }

  }, [user, navigate]);

  const addTodo = () => {
    db.collection('todos')
      .doc(user.uid)
      .set({
        todos: [...mytodos, text]
      });
  };
  
  const deleteTodo = (deleteTodo)=>{
    const docRef = db.collection('todos').doc(user.uid)
    docRef.get().then(docSnap=>{
        const result = docSnap.data().todos.filter(todo => todo !== deleteTodo)
        docRef.update({
          todos:result
        })
    })

  }

  return (
    <div className="container">
      <h1>Add Todos</h1>
      <div className="input-field">
        <input type="email" placeholder="Add Todos" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <button className="btn blue" onClick={addTodo}>Add</button>
      <ul className="collection">
        {mytodos.map(todo => (
          <li className="collection-item" key={todo} >
            {todo}
            <i className="material-icons right" onClick={()=> deleteTodo(todo)}>delete</i>

            </li>
        ))}
      </ul>
    </div>
  );
}
