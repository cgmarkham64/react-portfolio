import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';

import LogoMtn from '../../assets/images/Logo_white.svg';
import { faEtsy, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


export const Sidebar = () => {
    return <div className='nav-bar'>
        <Link className='logo' to='/'>
            <img src={LogoMtn} alt="logo" />
        </Link>
        <nav>
            <NavLink exact="true" activeclassname="active" className="home-link" to="/">
                <FontAwesomeIcon icon={faHome}/>
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="about-link" to="/about">
                <FontAwesomeIcon icon={faUser}/>
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="contact-link" to="/contact">
                <FontAwesomeIcon icon={faEnvelope}/>
            </NavLink>
        </nav>
        <ul>
            <li>
                <a target="_blank" rel='noreferrer' href='https://www.linkedin.com/in/cgmarkham'>
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </li>
            <li>
                <a target="_blank" rel='noreferrer' href='https://github.com/cgmarkham64'>
                    <FontAwesomeIcon icon={faGithub} />
                </a>
            </li>
            <li>
                <a target="_blank" rel='noreferrer' href='https://www.instagram.com/markhamadventures/'>
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
            </li>
            <li>
                <a target="_blank" rel='noreferrer' href='https://www.etsy.com/shop/MarkhamAdventureArt'>
                    <FontAwesomeIcon icon={faEtsy} />
                </a>
            </li>
        </ul>
    </div>
}