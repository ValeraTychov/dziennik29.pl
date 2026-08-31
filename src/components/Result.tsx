import { useEffect } from 'react';
import { useGameStore } from '../store/GameStore';

const specialResults: Record<string, JSX.Element> = {
	'd29-1-finale': (
		<div className="special-result special-result--centered">
			<p className="special-result__line special-result__line--bold">Congratulations!</p>
			<p className="special-result__line">Zrobiłeś to! Udało ci się rozszyfrować zapiski zespołu archeologów i krok po kroku zbliżyć się do rozwiązania tajemnicy. Dzięki swojej wytrwałości, odwadze i sprytowi rozwiązałeś wszystkie zagadki, ale ostateczny klucz wciąż nie został znaleziony!</p>
			<p className="special-result__line">
				Odpowiedzi przyniosły nowe pytania:<br />
				Co z licznymi odniesieniami do czasu i życia pozaziemskiego?<br />
				Jaki związek mają z nami, z ludźmi?<br />
				Co stało się z zespołem z wykopalisk?<br />
				Gdzie oni są?
			</p>
			<p className="special-result__line">To jeszcze nie koniec przygody z Dziennikiem 29…</p>
		</div>
	),
	'd29-2-finale': (
		<div className="special-result special-result--centered">
			<a
				className="special-result__link special-result__link--plain"
				href="https://journal29.com/120/thefinalpage/"
				target="_blank"
				rel="noopener noreferrer"
			>
				Final Page &rsaquo;
			</a>
			<p className="special-result__line">Oficjalna strona polskiego wydania Dziennika29 jest już niedostępna. Dlatego kierujemy Cię na oryginalną, anglojęzyczną stronę finałową — najbardziej uważnych badaczy czeka tam niespodzianka.</p>
		</div>
	),
	'd29-3-finale': (
		<div className="special-result special-result--centered">
			<p className="special-result__line special-result__line--bold">Gratulacje!</p>
			<p className="special-result__line">Zakończyłeś przygodę zaklętą w kartach Dziennika29 Zapomnienie.</p>
			<a
				className="special-result__image-link"
				href="https://discord.gg/f5hgnYbNEa"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span className="special-result__image-caption">Join Journal 29 Secret Club</span>
				<img className="special-result__image" src="https://journal29.com/160/secret.jpg" alt="" />
			</a>
		</div>
	),
};

const Result = () => {
	const result = useGameStore((state) => state.result);
	const currentPage = useGameStore((state) => state.currentPage);
	const specialResult = useGameStore((state) => state.specialResult);
	const setValue = useGameStore((state) => state.setValue);

	let resultClasses = 'result';

	if (result === 'Błędna odpowiedź') {
		resultClasses = 'result incorrect';
	} else if (result.startsWith('Poprawnie!')) {
		resultClasses = 'result correct';
	}

	useEffect(() => {
		setValue('result', '');
	}, [currentPage, setValue]);

	const special = specialResult ? specialResults[specialResult] : null;

	return (
		<div className="container container--narrow">
			{special ?? <div className={resultClasses}>{result}</div>}
		</div>
	);
};

export default Result;
