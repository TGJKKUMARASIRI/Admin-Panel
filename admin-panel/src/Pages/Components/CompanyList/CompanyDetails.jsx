import React from 'react';
import { useParams } from 'react-router-dom';
import CompanyList from '../../CompanyList';

const sampleData = [
  { id: 0, dessert: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  { id: 1, dessert: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
  { id: 2, dessert: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  { id: 3, dessert: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { id: 4, dessert: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
];

export default function CompanyDetails() {
  const { id } = useParams();
  const item = sampleData.find((data) => data.id === parseInt(id));

  if (!item) {
    return <div>No details available for this item</div>;
  }

  return (
    <div>
        <CompanyList>
      <h2>Details for {item.dessert}</h2>
      <p>Calories: {item.calories}</p>
      <p>Fat: {item.fat}</p>
      <p>Carbs: {item.carbs}</p>
      <p>Protein: {item.protein}</p>
      </CompanyList>
    </div>
  );
}
