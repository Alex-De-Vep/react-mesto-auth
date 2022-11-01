import React from "react";
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `card__trash ${isOwn ? '' : 'card__trash_hidden'}`;
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    const cardLikeButtonClassName = `card__button ${isLiked ? 'card__button_active' : ''}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return(
        <article className="card">
            <button className="card__image-button" onClick={handleClick}>
                <img className="card__image" src={card.link} alt={card.name} />
            </button>
            <div className="card__info">
                <h3 className="card__text">{card.name}</h3>
                <div className="card__button-wrapper">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="card__count-like">{card.likes.length}</span>
                </div>
            </div>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </article>
    );
}

export default Card;