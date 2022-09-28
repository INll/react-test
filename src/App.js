import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function FilterableProductTable({ products }) {
  // const [inStockOnly, setInStockOnly] = useState(false);
  // inStockOnly: The variable that stores the value of the state. This is to be changed often.
  // setInStockOnly: A function that alters inStockOnly, i.e. setInStockOnly(inStockOnly + 1)
  // useState(false): A hook. false is the initial value of inStockOnly. 
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <div>
      <SearchBar 
      filterText = {filterText}
      inStockOnly = {inStockOnly}
      // Passing set---- down, they'll behave as JS event handlers
      // To be used in combination with onChange attribute
      onFilterTextChange={setFilterText}
      onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
      products={products}
      filterText={filterText}
      inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
  <span style={{ color: 'red' }}>
    {product.name}
  </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// This component takes in a prop named 'products'
function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(
      filterText.toLowerCase()
    ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
      // Note: Object {product} is being passed into ProductRow
      // as props. Once it's read by the main ProductRow function,
      // the entire object (named 'product') is to be destructured
      // and extracted into a new variable that goes by the exact
      // name 'product', as hinted by destructurization syntax
      // { product }
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, onFilterTextChange, inStockOnly, onInStockOnlyChange }) {
  return (
    <form>
      <input 
      type="text" 
      value={filterText}
      placeholder="Search..."
      // Call onFilterTextChange function to change filterText up
      // in the component that owns the state. Then, the altered state
      // is passed down and becomes the value attribute here, which is why as
      // you type, text inside input element changes as well.
      // Also, since the state is changed, is it also passed down to ProductTable
      // component, which takes in the newly changed state and shows only those where
      // state value matches with, hence achiving filter.
      onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
        type="checkbox"
        checked={inStockOnly} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
};
