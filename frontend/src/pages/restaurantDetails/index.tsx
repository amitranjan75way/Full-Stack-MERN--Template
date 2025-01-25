import React from 'react';
import styles from './index.module.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface RestaurantDetailsProps {
  restaurantName: string;
  menuItems: MenuItem[];
}

const menuItems : MenuItem[] = [
  { id: 1, name: 'Margherita Pizza', description: 'Classic pizza with tomatoes and mozzarella.', price: 12.99 },
  { id: 2, name: 'Caesar Salad', description: 'Fresh romaine lettuce with Caesar dressing.', price: 8.99 },
  { id: 3, name: 'Spaghetti Carbonara', description: 'Pasta with creamy sauce and pancetta.', price: 14.99 },
  { id: 4, name: 'Tiramisu', description: 'Coffee-flavored Italian dessert.', price: 6.99 },
];

const RestaurantDetails: React.FC = () => {
  const restaurantName: string = "Baba ka Dhaba";
  return (
    <div className={styles.container}>
      <h1 className={styles.restaurantName}>{restaurantName}</h1>
      <div className={styles.menu}>
        {menuItems.map(item => (
          <div key={item.id} className={styles.card}>
            <h2 className={styles.dishName}>{item.name}</h2>
            <p className={styles.description}>{item.description}</p>
            <p className={styles.price}>${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
