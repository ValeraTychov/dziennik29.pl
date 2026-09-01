import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

export type Answer = string | string[] | { value: string; customValidator: string };

export interface IPuzzle {
	id: string;
	answer: Answer;
	key: string;
	tips?: string[];
	error?: string;
	specialResult?: string;
}

interface IGameData {
	currentPage: number;
	puzzles: Array<IPuzzle>;
	totalPages: number;
	result: string;
	correctAnswer: boolean;
	specialResult: string | null;
}

const initialState: IGameData = {
	currentPage: 0,
	puzzles: [],
	totalPages: 0,
	result: '',
	correctAnswer: false,
	specialResult: null,
};

interface IGameStore extends IGameData {
	setPuzzles: (puzzles: Array<IPuzzle>) => void;
	setValue: <K extends keyof IGameStore>(key: K, value: IGameStore[K]) => void;
	reset: () => void;
}

export const useGameStore = create<IGameStore>()(
	devtools(
		immer((set) => ({
			...initialState,
			setPuzzles: (puzzles) => {
				set((draft) => {
					draft.puzzles = puzzles;
					draft.totalPages = puzzles.length;
				});
			},
			setValue: (key, value) => {
				set((draft) => {
					(draft[key] as typeof value) = value;
				});
			},
			reset: () => {
				set({ ...initialState });
			},
		}))
	)
);
