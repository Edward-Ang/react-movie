import React, { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './FavCard.css';

function FavCard({ id, userDetail, movie, favCardVisible, toggleFavCardVisible }) {
    const user = userDetail;
    const [favrating, setFavrating] = useState('');
    const favInputRef = useRef(null);

    useEffect(() => {
        if (favInputRef.current) {
            favInputRef.current.focus();
        }
    }, [favCardVisible]);

    const handleFavCardVisible = () => {
        toggleFavCardVisible();
    }

    const handleContainerClick = (event) => {
        // Prevent propagation of click event to parent elements
        event.stopPropagation();
    }

    const handleFav = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/favourite`, {
                id,
                movie,
                user,
                favrating,
            });
            console.log(response.data.message);
            toast.success('Favourite added sucessfully', {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: true,
                closeButton: false
            });
            handleFavCardVisible();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log(error.response.data.message);
                toast.info('Already exists in favourites', {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeButton: false
                });
            } else {
                console.log('An unexpected error occurred. Please try again.');
                toast.error('Internal server error', {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeButton: false
                });
            }
        }
    }

    return (
        <>
            <ToastContainer />
            {favCardVisible && (
                <div className="fav-bg" onClick={handleFavCardVisible}>
                    <div className="cardContainer" id='favCardContainer' onClick={handleContainerClick}>
                        <div className="card" id='favCard'>
                            <div className="fav-footer">
                                <form className='fav-form' onSubmit={handleFav}>
                                    <div className='fav-rating'>
                                        <input
                                            className='fav-input'
                                            type='number' name='favrating'
                                            step={0.1} max={10} min={0} placeholder='0.0'
                                            onChange={(e) => { setFavrating(e.target.value) }}
                                            ref={favInputRef}
                                            required
                                        />
                                        <span>/10</span>
                                    </div>
                                    <button type='submit' className="trailer-btn" id="add-btn">Add to Favourites</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FavCard;