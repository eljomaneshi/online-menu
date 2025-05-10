import { Routes, Route, Link } from 'react-router-dom';
import {Container, Box, AppBar, Toolbar, Typography, IconButton, Badge, Paper} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { useOrder } from './context/OrderContext';

function App() {
  const { orderItems } = useOrder();
  const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ bgcolor: '#f9f9f9', minHeight: '100vh' }}>
      <Box
        sx={{
          m: 2,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 3
        }}
      >
        <AppBar position="static" sx={{ bgcolor: '#ff7043', borderRadius: 0 }}>
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.4rem'
              }}
            >
              🍽️ Online Menu
            </Typography>
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={totalQuantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<ProductList />} />
          </Routes>
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
