import { useCallback, useEffect, useState } from 'react';
import { isAnswerCorrect } from '../Helpers/answer';
import { useGameStore } from '../store/GameStore';

const AnswerForm = () => {
	const currentPage = useGameStore((state) => state.currentPage);
	const puzzles = useGameStore((state) => state.puzzles);
	const setValue = useGameStore((state) => state.setValue);

	const [answer, setAnswer] = useState('');

	const checkAnswer = useCallback(() => {
		const puzzle = puzzles[currentPage];

		if (isAnswerCorrect(puzzle?.answer, answer)) {
			setValue('correctAnswer', true);
			setValue('specialResult', puzzle?.specialResult ?? null);

			let result = '';
			if (!puzzle?.specialResult) {
				result = `Poprawnie!`;
				if (puzzle?.key) result += `\n{Klucz.${puzzle?.id}}: ${puzzle?.key}`;
			}

			setValue('result', result);
		} else {
			setValue('specialResult', null);
			setValue('result', 'Błędna odpowiedź');
		}
	}, [answer, currentPage, puzzles, setValue]);

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	return (
		<div className="container">
			<h1 className="h1">Rozwiąż zagadkę {puzzles[currentPage]?.id}</h1>

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
