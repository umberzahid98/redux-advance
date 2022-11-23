import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'My first book',
    description: 'the first book i ever wrote'
  },
  {
    id: 'p2',
    price: 3,
    title: 'My second book',
    description: 'the second book i ever wrote'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product)=>(
          <ProductItem
          key= {product.id}
          id={product.id}
          title= {product.title}
          price= {product.price}
          description= {product.description}/>
        ))}
      </ul>
    </section>
  );
};

export default Products;
