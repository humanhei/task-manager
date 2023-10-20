import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

interface ListItem {
  id: number;
  title: string;
  date: string;
  cat: string;
}

interface ListDisplayProps {
  list: ListItem[];
  onDeleteItem: (itemId: number) => void;
}

function TaskList({ list, onDeleteItem }: ListDisplayProps) {

  return (
    <>
      <div>
        <h1>Task List</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {list.length > 0 ? list.map((item) =>
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>{item.cat}</td>
              <td><Button onClick={() => onDeleteItem(item.id)}>Delete</Button></td>
            </tr>
            
          )
            :
            <tr><td colSpan={4}><p className="text-gray-500 text-lg">No Task in the List</p></td></tr>
          }
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default TaskList;