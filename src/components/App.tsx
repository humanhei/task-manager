import { useEffect, useRef, useState } from 'react';
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import 'bootstrap/dist/css/bootstrap.min.css';

interface ListItem {
  id: number;
  title: string;
  date: string;
  cat: string;
}

function App() {
  const [list, setList] = useState<ListItem[]>([]);
  const didMountRef = useRef(false);

  useEffect(() => {
    const storedList = localStorage.getItem('taskList');
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    if (didMountRef.current){
      localStorage.setItem('taskList', JSON.stringify(list));
    }
    didMountRef.current = true;
  }, [list]);

  function handleAddItem(title: string, date: string, cat: string) {
    // Add new item
    const newItem: ListItem = {
      id: Date.now(),
      title,
      date,
      cat,
    };
    setList([...list, newItem]);
  }

  const handleDeleteItem = (itemId: number) => {
    // Delete item
    const updatedList = list.filter((item) => item.id !== itemId);
    setList(updatedList);
  };


  return (
    <>
      <div className="p-5">
        <h1>Task Manager</h1>
        <TaskForm onAddItem={handleAddItem} />
        <TaskList list={list} onDeleteItem={handleDeleteItem} />
      </div>
    </>
  )
}

export default App;
