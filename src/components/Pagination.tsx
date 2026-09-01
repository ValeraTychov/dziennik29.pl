import { Link } from 'react-router-dom';
import { useGameStore } from '../store/GameStore';

const Pagination = () => {
	const currentPage = useGameStore((state) => state.currentPage);
	const totalPages = useGameStore((state) => state.totalPages);
	const puzzles = useGameStore((state) => state.puzzles);
	const setValue = useGameStore((state) => state.setValue);

	const maxPages = 7;
	let start = Math.max(0, currentPage - Math.floor(maxPages / 2));
	let end = start + maxPages;

	if (end > totalPages) {
		end = totalPages;
		start = Math.max(0, end - maxPages);
	}

	const pageLinks = [];
	for (let i = start; i < end; i++) {
		const id = puzzles[i]?.id ?? String(i);
		pageLinks.push(
			<Link
				key={i}
				to={`/${id}`}
				tabIndex={0}
				aria-label={`Strona ${id}`}
				className={i === currentPage ? 'active' : ''}
				aria-current={i === currentPage ? 'page' : undefined}
				onClick={() => {
					setValue('currentPage', i);
				}}
			>
				{id}
			</Link>
		);
	}

	const prevId = puzzles[currentPage - 1]?.id;
	const nextId = puzzles[currentPage + 1]?.id;

	return (
		<div className="pagination">
			<Link
				to={prevId ? `/${prevId}` : '#'}
				className="pagination-prev"
				aria-label="Poprzednia strona"
				onClick={() => {
					if (currentPage > 0) setValue('currentPage', currentPage - 1);
				}}
			>
				«
			</Link>
			{pageLinks}
			<Link
				to={nextId ? `/${nextId}` : '#'}
				className="pagination-next"
				aria-label="Nastepna strona"
				onClick={() => {
					if (currentPage < totalPages - 1) setValue('currentPage', currentPage + 1);
				}}
			>
				»
			</Link>
		</div>
	);
};

export default Pagination;
