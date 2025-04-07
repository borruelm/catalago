import { ReactElement, useCallback, useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { ImageListItem } from '@mui/material';
import { isEmpty } from 'lodash';
import { getActiveImagesList } from "../../services/ImagesServices";
import { image } from "./SharedInterfaces";


const ImageComponent = ({ articleId }: { articleId: number }): ReactElement => {
    const [imgeData, setImageData] = useState<image[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getImages = useCallback(() => {
        getActiveImagesList(setImageData, articleId);
        setTimeout(() => { setIsLoading(false); }, 500)
    }, [articleId]);

    const renderImages = () => {
        if (!isEmpty(imgeData)) {
            return imgeData.map(image => {
                return <ImageListItem>
                    <img src={`data:image/png;base64,${image.content}`} alt={image.name} />
                </ImageListItem>
            })

        } else {
            return <p>No images</p>
        }
    }

    useEffect(() => {
        if (isLoading)
            getImages();

    }, [isLoading, getImages])

    return <>{isLoading ? <><p>loading</p><LoadingSpinner /></> : renderImages()}</>;
}

export default ImageComponent;
