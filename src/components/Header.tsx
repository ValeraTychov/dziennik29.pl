import { useParams, Link } from 'react-router-dom';
import whiteLogo from '../assets/whiteLogo.png';
import dziennik29Data from '../data/dziennik29.json';
import dziennik29PrzebudzenieData from '../data/dziennik29Przebudzenie.json';

const dziennik29Ids = new Set(dziennik29Data.map((p) => p.id));
const przebudzenieIds = new Set(dziennik29PrzebudzenieData.map((p) => p.id));

const getBrandContent = (pageId?: string) => {
	if (!pageId || dziennik29Ids.has(pageId)) {
		return (
			<>
				<img src={whiteLogo} alt="Dziennik 29" />
			</>
		);
	}

	const subtitle = przebudzenieIds.has(pageId) ? 'Przebudzenie' : 'Zapomnienie';
	return (
		<>
			<span className="line">
				<h2>D</h2>
				<h3>ziennik</h3>
				<h2>29</h2>
			</span>
			<h4 className="subtitle">{subtitle}</h4>
		</>
	);
};

const Header = () => {
	const { pageId } = useParams();

	return (
		<header className="header">
			<div className="nav">
				<Link className="brand" to="/" aria-label="Strona główna">
					{getBrandContent(pageId)}
				</Link>
			</div>
		</header>
	);
};

export default Header;
