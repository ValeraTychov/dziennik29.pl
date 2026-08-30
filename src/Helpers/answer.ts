import type { Answer } from '../store/GameStore';

type DynamicChecker = (guess: string) => boolean;
type DynamicFormatter = () => string;

const dynamicCheckers: Record<number, DynamicChecker> = {
	// Puzzle 82: answer is the current system time in hhmm format
	82: (guess) => {
		const now = new Date();
		const hh = String(now.getHours()).padStart(2, '0');
		const mm = String(now.getMinutes()).padStart(2, '0');
		return guess.trim() === `${hh}${mm}`;
	},
	// Puzzle 134 (Zapomnienie #13): any integer in the range 3646–3946
	134: (guess) => {
		const num = Number(guess.trim());
		return Number.isInteger(num) && num >= 3646 && num <= 3946;
	},
};

const dynamicFormatters: Record<number, DynamicFormatter> = {
	82: () => {
		const now = new Date();
		const hh = String(now.getHours()).padStart(2, '0');
		const mm = String(now.getMinutes()).padStart(2, '0');
		return `Użyj aktualnego czasu (godzina i minuty): ${hh}${mm}`;
	},
	134: () => 'Dowolna liczba z zakresu 3646 - 3946',
};

const reverseAnswer = (str: string) => str.split('').reverse().join('');

const isDynamic = (answer: Answer): answer is { dynamic: number } =>
	typeof answer === 'object' && !Array.isArray(answer) && 'dynamic' in answer;

const isAnswerCorrect = (answer: Answer | undefined, guess: string): boolean => {
	if (answer == null) return false;

	const normalized = guess.trim().toLowerCase();

	if (isDynamic(answer)) {
		const checker = dynamicCheckers[answer.dynamic];
		return checker ? checker(normalized) : false;
	}

	if (Array.isArray(answer)) {
		return answer.some(
			(variant) => reverseAnswer(variant).toLowerCase() === normalized
		);
	}

	return reverseAnswer(answer).toLowerCase() === normalized;
};

const formatAnswer = (answer: Answer | undefined): string => {
	if (answer == null) return '';

	if (isDynamic(answer)) {
		const formatter = dynamicFormatters[answer.dynamic];
		return formatter ? formatter() : '';
	}

	if (Array.isArray(answer)) {
		return reverseAnswer(answer[0]);
	}

	return reverseAnswer(answer);
};

export { isAnswerCorrect, formatAnswer };
