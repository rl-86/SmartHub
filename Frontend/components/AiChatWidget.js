'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  LinearProgress,
} from '@mui/material';

export default function AiChatWidget() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const typeTextEffect = (text) => {
    let index = 1;
    setResponse('');

    const interval = setInterval(() => {
      setResponse(text.substring(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, 5);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      typeTextEffect(data.reply);
    } catch (error) {
      setResponse('Något gick fel.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        pb: 2,
      }}
    >
      <CardContent>
        <Typography variant='h6' sx={{ mb: 1 }}>
          ChatGPT
        </Typography>

        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            fullWidth
            label='Message ChatGPT'
            multiline
            variant='outlined'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            onClick={handleSend}
            variant='outlined'
            sx={{ ml: 1 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={40} /> : 'Send'}
          </Button>
        </Box>

        {loading && (
          <Typography variant='body2' color='text.secondary'>
            <LinearProgress
              variant='indeterminate'
              sx={{ width: '100%', mt: 4, mx: 3 }}
            />
          </Typography>
        )}

        {response && (
          <Typography
            variant='body1'
            sx={{ whiteSpace: 'pre-line', mt: 2, mx: 2 }}
          >
            {response}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
