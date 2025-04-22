import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export default function TodoWidget() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const fetchTodos = async () => {
    const res = await fetch(`${API_URL}/api/todos`);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await fetch(`${API_URL}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, done: false }),
    });
    const newTodo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
    setText('');
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/api/todos/${id}`, { method: 'DELETE' });
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Card
      sx={{
        mb: 2,
        height: 300,
        width: 300,
      }}
    >
      <Typography component='h4' variant='body1' sx={{ m: 0, p: 2, pb: 1 }}>
        ToDo
      </Typography>
      <CardContent
        sx={{
          mx: 1,
          py: 0,
        }}
      >
        <Box sx={{ display: 'flex', height: '15', gap: 0, mb: 0 }}>
          <TextField
            fullWidth
            size='small'
            label='New task'
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTodo();
              }
            }}
          />
          <Button variant='outlined' size='small' onClick={addTodo}>
            Add
          </Button>
        </Box>
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge='end' onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={todo.text} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
