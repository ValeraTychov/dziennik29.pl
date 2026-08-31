import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useGameStore } from '../store/GameStore';

const GoToPage = () => {
	const currentPage = useGameStore((state) => state.currentPage);
	const keys = useGameStore((state) => state.keys);
	const setValue = useGameStore((state) => state.setValue);
	const [goToPage, setGoToPage] = useState<string>('');
	const navigate = useNavigate();

	useEffect(() => {
		setGoToPage(keys[currentPage]?.id ?? '');
	}, [currentPage, keys]);

	return (
		<div className="goTo">
			<label htmlFor="goTo-input" className="goToPageLabel">
				Strona:
			</label>
			<input
				type="text"
				className="goTo-input"
				id="goTo-input"
				value={goToPage}
				onChange={(e) => setGoToPage(e.target.value)}
			/>
			<button
				className="goTo-button"
				onClick={() => {
					const idx = keys.findIndex((k) => k.id === goToPage.trim());
					if (idx !== -1) {
						setValue('currentPage', idx);
						navigate(`/${goToPage.trim()}`);
					}
				}}
				aria-label="Przejdź do strony"
			>
				Przejdź
			</button>
		</div>
	);
};

export default GoToPage;
