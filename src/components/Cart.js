import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, TextField, Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useOrder } from '../context/OrderContext';

const Cart = () => {
  const { orderItems, removeFromOrder, changeQuantity, orderNote, setOrderNote } = useOrder();
  const [jsonOutput, setJsonOutput] = useState(null);

  const generateJSON = () => {
    const json = {
      pospointId: "restaurant1",
      ordernote: orderNote,
      products: orderItems.map(({ id, price, quantity }) => ({
        id, price, quantity, note: ""
      }))
    };
    setJsonOutput(json);
  };

  if (orderItems.length === 0) return <Typography>Your cart is empty.</Typography>;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Order Overview</Typography>
        {orderItems.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
            <Typography sx={{ flex: 1 }}>{item.name} - ALL {(item.price).toFixed(2)}</Typography>
            <IconButton onClick={() => changeQuantity(item.id, -1)}><RemoveIcon /></IconButton>
            <Typography>{item.quantity}</Typography>
            <IconButton onClick={() => changeQuantity(item.id, 1)}><AddIcon /></IconButton>
            <IconButton onClick={() => removeFromOrder(item.id)}><DeleteIcon /></IconButton>
          </div>
        ))}
        <TextField
          label="Order Note"
          fullWidth
          value={orderNote}
          onChange={(e) => setOrderNote(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#ff7043',
            '&:hover': {
              backgroundColor: '#e25e35'
            }
          }}
          onClick={generateJSON}
        >
          Submit Order
        </Button>


        {jsonOutput && (
          <pre style={{ background: '#f4f4f4', padding: 10, marginTop: 20 }}>
            {JSON.stringify(jsonOutput, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
};

export default Cart;
