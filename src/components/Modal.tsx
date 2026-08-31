import { useState, useRef, useEffect } from 'react';
import { formatAnswer } from '../Helpers/answer';
import { useGameStore } from '../store/GameStore';

const Modal = () => {
	const [open, setOpen] = useState(false);
	const [titleText, setTitleText] = useState('');
	const modalRef = useRef<HTMLDivElement>(null);
	const [modalType, setModalType] = useState('');
	const [hintIndex, setHintIndex] = useState(0);

	const keys = useGameStore((state) => state.keys);
	const currentPage = useGameStore((state) => state.currentPage);
	const setValue = useGameStore((state) => state.setValue);

	const handleModalOpen = (type: string) => {
		if (type === 'tip') {
			setTitleText('Czy na pewno chcesz zobaczyć podpowiedź?');
			setModalType('tip');
		}
		if (type === 'answer') {
			setTitleText('Czy na pewno chcesz zobaczyć rozwiązanie?');
			setModalType('answer');
		}
		setOpen(true);
	};

	const handleModalYes = () => {
		setOpen(false);
		setValue('specialResult', null);
		if (modalType === 'tip') {
			const tips = keys[currentPage]?.tips ?? [];
			if (tips.length === 0) {
				setValue('result', 'Brak dostępnych podpowiedzi');
			} else {
				const idx = hintIndex % tips.length;
				const prefix = tips.length > 1 ? `${idx + 1}. ` : '';
				setValue('result', `${prefix}${tips[idx]}`);
				setHintIndex(idx + 1);
			}
		}
		if (modalType === 'answer') {
			const answer = formatAnswer(keys[currentPage]?.answer);
			setValue('result', `Odpowiedź: ${answer}`);
		}
	};

	const handleModalClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		setHintIndex(0);
	}, [currentPage]);

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (modalRef.current && event.target === modalRef.current) {
				handleModalClose();
			}
		};
		if (open) {
			window.addEventListener('click', handleClick);
		}
		return () => {};
	}, [open]);

	return (
		<>
			<div className="container">
				<div className="form-wrap">
					<button
						className="button"
						aria-label="Podpowiedź"
						onClick={() => handleModalOpen('tip')}
					>
						Podpowiedź
					</button>
					<button
						className="button"
						aria-label="Rozwiązanie"
						onClick={() => handleModalOpen('answer')}
					>
						Rozwiązanie
					</button>
				</div>
			</div>

			<div className="modal" style={{ display: open ? 'block' : 'none' }} ref={modalRef}>
				<div className="modal-content">
					<div className="modal-title">{titleText}</div>
					<div className="modal-body">
						<div className="form-wrap">
							<button className="button" aria-label="Tak" onClick={handleModalYes}>
								Tak
							</button>
							<button className="button" aria-label="Nie" onClick={handleModalClose}>
								Nie
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
