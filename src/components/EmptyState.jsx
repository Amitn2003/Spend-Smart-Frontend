import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmptyState = () => {
  const navigate = useNavigate();

  const redirectFunc = () => {
    navigate('/add'); // Change this to your actual route
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        px: 2,
        maxWidth: 500,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src="/cat-confusion.png" // Replace with your actual image path
        alt="No Expenses"
        style={{ width: '100%', maxWidth: 300, marginBottom: 24 }}
      />

      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Oops! No Expenses Found
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Seems like you haven't added any expense yet. Start tracking your spending now!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={redirectFunc}
        sx={{ textTransform: 'none', px: 4, py: 1.5, fontSize: 16 }}
      >
        Add Expense
      </Button>
    </Box>
  );
};

export default EmptyState;
