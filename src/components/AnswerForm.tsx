import { useCallback, useEffect, useState } from 'react';
import { isAnswerCorrect } from '../Helpers/answer';
import { useGameStore } from '../store/GameStore';

const AnswerForm = () => {
	const currentPage = useGameStore((state) => state.currentPage);
	const keys = useGameStore((state) => state.keys);
	const setValue = useGameStore((state) => state.setValue);

	const [answer, setAnswer] = useState('');

	const checkAnswer = useCallback(() => {
		const currentKey = keys[currentPage];
		const key = currentKey?.key;

		if (isAnswerCorrect(currentKey?.answer, answer)) {
			setValue('correctAnswer', true);
			setValue('specialResult', currentKey?.specialResult ?? null);

			let result = '';
			if (!currentKey?.specialResult) {
				result = `Poprawnie!`;
				if (key) result += `\n{Klucz.${currentKey?.id}}: ${key}`;
			}

			setValue('result', result);
		} else {
			setValue('specialResult', null);
			setValue('result', 'Błędna odpowiedź');
		}
	}, [answer, currentPage, keys, setValue]);

	useEffect(() => {
		const listener = (event: { code: string; preventDefault: () => void }) => {
			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				event.preventDefault();
				checkAnswer();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [currentPage, checkAnswer]);

	useEffect(() => {
		setAnswer('');
		setValue('specialResult', null);
	}, [currentPage, setValue]);

	return (
		<div className="container">
			<h1 className="h1">Rozwiąż zagadkę {keys[currentPage]?.id}</h1>

			<div className="form-wrap">
				<div className="input-shell">
					<div className="input-box">
						<input
							className="input"
							type="text"
							placeholder="Wpisz odpowiedź…"
							autoComplete="off"
							value={answer}
							autoFocus
							onChange={(e) => setAnswer(e.target.value)}
						/>
						<div className="sep"></div>
						<button className="go" aria-label="Sprawdź" onClick={checkAnswer}>
							›
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnswerForm;
