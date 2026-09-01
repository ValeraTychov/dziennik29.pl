import type { Answer } from '../store/GameStore';

interface DynamicAnswer {
	check: (guess: string) => boolean;
}

const dynamicAnswers: Record<string, DynamicAnswer> = {
	puzzle82: {
		check: (guess) => {
			const now = new Date();
			const hh = String(now.getHours()).padStart(2, '0');
			const mm = String(now.getMinutes()).padStart(2, '0');
			return guess.trim() === `${hh}${mm}`;
		},
	},
	puzzle133: {
		check: (guess) => {
			const num = Number(guess.trim());
			return Number.isInteger(num) && num >= 3646 && num <= 3946;
		},
	},
};

const reverseAnswer = (str: string) => str.split('').reverse().join('');

const isDynamic = (answer: Answer): answer is { value: string; customValidator: string } =>
	typeof answer === 'object' && !Array.isArray(answer) && 'customValidator' in answer;

const isAnswerCorrect = (answer: Answer | undefined, guess: string): boolean => {
	if (answer == null) return false;

	const normalized = guess.trim().toLowerCase();

	if (isDynamic(answer)) {
		return dynamicAnswers[answer.customValidator]?.check(normalized) ?? false;
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
		return reverseAnswer(answer.value);
	}

	if (Array.isArray(answer)) {
		return reverseAnswer(answer[0]);
	}

	return reverseAnswer(answer);
};

export { isAnswerCorrect, formatAnswer };
