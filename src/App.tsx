import { useState } from 'react';
import './App.css';
import Wheel1 from './components/Wheel1';
import Wheel2 from './components/Wheel2';
export const prizes = [
	{ text: '1 000 000', weight: 15, color: 'blue' },
	{ text: 'Legendary egg', weight: 5, color: 'pink' },
	{ text: '100X', weight: 2, color: 'red' },
	{ text: '50 Ton', weight: 1, color: 'green' },
	{ text: 'Legendary bird', weight: 5, color: 'brown' },
	{ text: 'Try again', weight: 114, color: 'purple' },
	{ text: '500 000', weight: 20, color: 'grey' },
	{ text: '0.01 Ton', weight: 3, color: 'black' },
	{ text: 'Ticket x3', weight: 10, color: 'indigo' },
	{ text: '100 000', weight: 25, color: 'coral' },
];

export default function App() {
	return (
		<>
			{/* <Wheel1 /> */}
			<Wheel2 />
		</>
	);
}
