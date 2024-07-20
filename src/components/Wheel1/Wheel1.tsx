import { useState } from 'react';
import s from './Wheel1.module.css';
import { prizes } from '../../App';

export default function Wheel1() {
	const [isRotation, setIsRotation] = useState(false);
	const [isStopRotate, setIsStopRotate] = useState(false);

	const startRotation = () => {
		setIsRotation(true);
		setIsStopRotate(false);
		setTimeout(() => {
			setIsStopRotate(true);
		}, Math.floor(Math.random() * 10000) + 1);
	};
	return (
		<div>
			<div className={s.arrow}></div>
			<ul
				className={`${s.circle} ${isRotation ? s['start-rotate'] : ''} ${
					isStopRotate ? s['stop-rotate'] : ''
				}`}
			>
				{prizes.map((prize) => {
					return (
						<li key={prize.text}>
							<div className={s.text}>{prize.text}</div>
						</li>
					);
				})}
			</ul>
			<button className={s['spin-button']} onClick={startRotation}>
				Spin
			</button>
		</div>
	);
}
