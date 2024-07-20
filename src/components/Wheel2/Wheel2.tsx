import s from './Wheel2.module.css';
import { prizes } from '../../App';
import { useRef, useState } from 'react';

export default function Wheel2() {
	const degreeses = 360 / prizes.length;
	const config = {
		animationsSpins: 5,
		animationTime: 5000,
	};
	const containerRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);
	const [currentPrize, setCurrentPrize] = useState(0);
	const [isSpinning, setIsSpinning] = useState(false);

	const easeInOut = (time: number) => {
		return 0.5 * (1 - Math.cos(Math.PI * time));
	};

	const spin = (index: number) => {
		if (isSpinning) return;
		setIsSpinning(true);
		const segmentDegreeses = degreeses * index - 90;
		const randomDegreeses = (degreeses - 6) * Math.random() + 3;
		const animationRotate = 360 * config.animationsSpins;
		const rotate = -segmentDegreeses - randomDegreeses - animationRotate;
		startAnimation(
			config.animationTime,
			(progress) => {
				if (containerRef.current) {
					containerRef.current.style.transform = `rotate(${
						currentPrize + (rotate - currentPrize) * easeInOut(progress)
					}deg)`;
				}
				if (imageRef.current) {
					imageRef.current.style.transform = `rotate(${
						currentPrize + (rotate - currentPrize) * easeInOut(progress)
					}deg)`;
				}
			},
			() => {
				setCurrentPrize(rotate % 360);
				setIsSpinning(false);
			}
		);
	};

	function getRandomIndex() {
		// Вычисляем сумму всех весов
		const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);

		// Генерируем случайное число от 0 до суммы весов
		let randomNum = Math.random() * totalWeight;

		// Находим индекс
		for (let i = 0; i < prizes.length; i++) {
			if (randomNum < prizes[i].weight) {
				return i;
			}
			randomNum -= prizes[i].weight;
		}
	}

	const handleClick = () => {
		const index = getRandomIndex();
		if (index) {
			console.log(prizes[index]);
			spin(index);
		}
	};

	const startAnimation = (
		duration: number,
		callback: (value: number) => void,
		finish: () => void
	) => {
		let startAnimationTime: null | number = null;
		requestAnimationFrame(function measure(time) {
			if (!startAnimationTime) {
				startAnimationTime = time;
			}

			const progress = (time - startAnimationTime) / duration;

			callback(progress);

			if (progress < 1) {
				requestAnimationFrame(measure);
			} else {
				callback(1);
				finish();
			}
		});
	};

	return (
		<div>
			<div className={s['wheel-of-fortune']}>
				<div className={s['wheel-of-fortune__arrow']}>
					<img src="/trigger.png" alt="" />
				</div>
				<div className={s['wheel-of-fortune__img']} ref={imageRef}>
					<img src="/spinner.png" alt="" />
				</div>
				<div className={s['wheel-of-fortune__container']} ref={containerRef}>
					{prizes.map((label, index) => {
						const skew = degreeses - 90;
						return (
							<div
								key={index}
								className={s['wheel-of-fortune__segment']}
								style={{
									transform: `rotate(${
										degreeses * index + skew - 90
									}deg) skew(${skew}deg)`,
									backgroundColor: label.color,
								}}
							>
								{label.text}
							</div>
						);
					})}
				</div>
			</div>
			<div style={{ marginTop: '30px', position: 'relative', zIndex: 1 }}>
				<button onClick={handleClick}>Spin</button>
			</div>
		</div>
	);
}
