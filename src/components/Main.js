import React, {useEffect, useState} from 'react';
import Card from "./Card";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupConfirm from "./PopupConfirm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import {currentUserContext} from '../context/CurrentUserContext';

function Main(props) {
    const [currentUser, setCurrentUser] = useState({name: "Имя"});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isPopupConfirm, setIsPopupConfirmOpen] = useState(false);
    const [buttonPopup, setButtonPopup] = useState("Сохранить");
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedCardDelete, setSelectedCardDelete] = useState(null);
    const [cards, setCards] = React.useState([])

    useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log(err);
            });

        api.getCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleCardClick = (path) => {
        setSelectedCard(path);
    }

    const handleCardDelete = (card) => {
        setIsPopupConfirmOpen(true);
        setSelectedCardDelete(card);
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsPopupConfirmOpen(false);
    };

    const handleUpdateUser = (data) => {
        setButtonPopup("Сохранение");

        api.updateUserInfo(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setButtonPopup("Сохранено");
            });
    }

    const handleUpdateAvatar = (data) => {
        setButtonPopup("Сохранение");

        api.updateAvatar(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setButtonPopup("Сохранено");
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.toggleLike(card._id, !isLiked)
            .then((newCard) => {
                setCards((oldCards) =>
                    oldCards.map((oldCard) => oldCard._id === card._id ? newCard : oldCard)
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(data) {
        setButtonPopup("Сохранение");

        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setButtonPopup("Сохранено");
            });
    }

    function deleteCard(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((oldCards) =>
                    oldCards.filter((oldCard) => oldCard._id !== card._id)
                );
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <currentUserContext.Provider value={currentUser}>
                <main className="content">
                    <section className="profile">
                        <div className="container">
                            <div className="profile__content">
                                <button onClick={handleEditAvatarClick} className="profile__image-button">
                                    <div className="profile__image-edit"></div>
                                    <picture>
                                        <img className="profile__image" src={currentUser.avatar}
                                             alt="Аватарка профиля"/>
                                    </picture>
                                </button>
                                <div className="profile__info">
                                    <div className="profile__title-wrapper">
                                        <h1 className="profile__title">{currentUser.name}</h1>
                                        <button className="profile__button-edit" type="button"
                                                onClick={handleEditProfileClick}>
                                        </button>
                                    </div>
                                    <p className="profile__text">{currentUser.about}</p>
                                </div>
                                <button className="profile__button" type="button" onClick={handleAddPlaceClick}>
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="trips">
                        <div className="container">
                            <ul className="trips__list">
                                {cards.map((item) => (
                                    <li className="trips__item" key={item._id}>
                                        <Card card={item} onCardClick={handleCardClick} onCardLike={handleCardLike}
                                              onCardDelete={handleCardDelete}/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </main>
                <Footer/>

                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen}
                                  onClose={closeAllPopups} submitButton={buttonPopup}/>
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen}
                                 onClose={closeAllPopups} submitButton={buttonPopup}/>
                <AddPlacePopup onUpdatePlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen}
                               onClose={closeAllPopups} submitButton={buttonPopup}/>
                <PopupConfirm onSubmit={deleteCard} card={selectedCardDelete} isOpen={isPopupConfirm}
                              onClose={closeAllPopups}/>
                {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups}/>}
            </currentUserContext.Provider>
        </>
    );
}

export default Main;