import React, { useState, useEffect } from "react";
import ImageViewer from "react-simple-image-viewer";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getImage } from "../../../redux/reducers/Image/image.action";

// component
import PhotoCollection from "./PhotoCollection.component";

function Photos() {
    // const [photos] = useState([
    //     "https://b.zmtcdn.com/data/pictures/chains/1/19490811/d1b9d5fa9d2d5563debeca8b1df9834c.jpg",
    //     "https://b.zmtcdn.com/data/pictures/chains/1/19490811/bf50a02d59e276a70b9490901e24d7e4.jpg",
    //     "https://b.zmtcdn.com/data/pictures/chains/8/378/898f269f6704a7ef3f787489fe1e5109.jpg",
    //     "https://b.zmtcdn.com/data/pictures/chains/8/378/285ed4164c2fdebbd3dcf15422b1d210.jpg",
    //     "https://b.zmtcdn.com/data/pictures/chains/8/378/1d5abbb32f170b6ac114f0f191a30827.jpg",
    //     "https://b.zmtcdn.com/data/pictures/chains/8/378/b8e14bd3f1a5f406d843e9cbf3f10e2c.jpg",
    // ]);


    const dispatch = useDispatch();
    const [photos, setPhotos] = useState([]);
    const reduxState = useSelector(
        (globalState) => globalState.restaurant.selectedRestaurant.restaurant
    );

    useEffect(() => {
        if (reduxState)
            console.log(reduxState);
        dispatch(getImage(reduxState?.photos)).then((data) => {
            const images = [];
            console.log(data);
            data.payload.images.map(({ Location }) => images.push(Location));
            console.log(images);
            setPhotos(images);
        });
    }, [reduxState]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const closeViewer = () => setIsMenuOpen(false);
    const openViewer = () => setIsMenuOpen(true);

    return (
        <>
            {isMenuOpen && (
                <ImageViewer
                    src={photos}
                    currentIndex={currentImage}
                    disableScroll={false}
                    onClose={closeViewer}
                />
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {photos.map((photo, index) => (
                    <PhotoCollection
                        key={index}
                        openViewer={openViewer}
                        index={index}
                        image={photo}
                        setCurrentImage={setCurrentImage}
                    />
                ))}
            </div>
        </>
    );
}

export default Photos;