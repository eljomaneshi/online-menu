import { Typography, Grid, Card, CardContent, CardActionArea, CardMedia } from '@mui/material';
import products from '../data/products';
import { useOrder } from '../context/OrderContext';

const ProductList = () => {
  const { addToOrder } = useOrder();

  return (
    <div>
      <Typography variant="h4" gutterBottom>Menu</Typography>
      <Grid container spacing={5}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: '#f2cebf',
                  transform: 'scale(1.02)',
                  boxShadow: 6
                }
              }}
            >
              <CardActionArea onClick={() => addToOrder(product)}>
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography color="text.secondary">
                    {product.category.name}
                  </Typography>
                  <Typography>ALL {(product.price).toFixed(2)}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
