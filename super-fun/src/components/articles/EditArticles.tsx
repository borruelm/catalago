import { ReactElement, SetStateAction, useCallback, useEffect, useState } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Button, Card, Grid2 as Grid, Switch, TextField, Typography } from "@mui/material";
import { Item } from "../shared/Item";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from 'lodash';
import { getAllImagesList, updImagesActive, saveImages } from "../../services/ImagesServices";
import { image } from "../shared/SharedInterfaces";
import { RenderImage } from "../shared/SharedFunction";


const EditArticles = (): ReactElement => {
    const location = useLocation();
    const { data } = location.state;
    const [articleData, setArticleData] = useState({
        id: data.id,
        title: data.title,
        content: data.content,
        active: data.active,
        isDirty: false
    });
    const [imgeData, setImageData] = useState<image[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        setIsImageUploading(true);
        if (!selectedFile) {
            setUploadStatus('Please select a file.');
            return;
        } else {

            const reader = new FileReader();
            reader.onload = (e => {
                const fileContent = e.target?.result;
                // Use fileContent (e.g., display it, process it, etc.)
                console.log(fileContent);
                debugger
                saveImages(articleData.id, selectedFile?.name, fileContent);

              });
              reader.readAsDataURL( selectedFile );


            saveImages(articleData.id, selectedFile?.name, selectedFile);
            debugger
            return;
/*
            debugger
            const reader = new FileReader();
            reader.onload = (e) => {
                debugger    
                const dataURL = reader.result;
  //const base64 = dataURL?.slice(dataURL.indexOf(',')+1);
  //console.log(base64);
                const fileContent = e?.target?.result;
                // Use fileContent here (e.g., set it to state, display it, etc.)
                console.log(fileContent);

                saveImages(articleData.id, selectedFile?.name, fileContent);
                debugger
            };
            reader.readAsText(selectedFile); // Or readAsDataURL, readAsBinaryString, etc.
            saveImages(articleData.id, selectedFile?.name, reader.readAsBinaryString(selectedFile));
            debugger*/
        }
    };

    const getValue = (name: string, value: any) => {
        switch (name) {
            case 'active':
                return articleData.active ? false : true;
            default:
                return value;
        }
    }
    const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setArticleData({
            ...articleData,
            [name]: getValue(name, value),
            isDirty: true,
        });
    };

    const navigate = useNavigate();
    const goToMainDashboard = () => navigate('/Dashboard');

    const handleSave = () => {
        console.info("we will save or update ")
        console.info({ articleData })
        debugger

    }

    const handleImgActive = (id: number, active: number) => {
        updImagesActive(id, active)
        setIsLoading(true);
        setTimeout(() => getArticleImages(), 500);
        setTimeout(() => { setIsLoading(false); }, 500);
    }

    const getArticleImages = useCallback(() => {
        data.id && getAllImagesList(setImageData, data.id);
        setTimeout(() => { setIsLoading(false); }, 500);
    }, [])


    const renderImagesComponent = () => imgeData && imgeData.map(image => {
        return <Grid container spacing={1}>
            <Grid size={3}>
                Active
                <Switch name="active" checked={Boolean(image.active)} onChange={() => handleImgActive(image.id, image.active)} />
            </Grid>
            <Grid size={8}>
                <Card>
                    <img style={image.active ? { width: '80%' } : { width: '80%', opacity: '50%' }} src={`data:image/png;base64,${image.content}`} alt={image.name} />
                </Card>
            </Grid>
        </Grid>

    })


    useEffect(() => {
        getArticleImages();
    }, []);
    return isEmpty(data) ? <p>Not found</p> : <>
        <div style={{ maxWidth: '900px', minWidth: '380px', marginInline: 'auto' }}>
            <Card sx={[
                {
                    width: 'auto',
                    textDecoration: 'underline',
                }]}>
                <form>
                    <Typography variant="h3">Editing Article</Typography>
                    <Grid container spacing={1}>
                        <Grid size={3}>
                            <Item>Title</Item>
                        </Grid>
                        <Grid size={9}>
                            <TextField
                                variant="standard"
                                fullWidth={true}
                                id="title"
                                name="title"
                                value={articleData.title}
                                onChange={handleInputChange} />
                        </Grid>
                        <Grid size={3}>
                            <Item>Content</Item>
                        </Grid>
                        <Grid size={9}>
                            <TextField
                                id="content"
                                name="content"
                                label="Article Content"
                                multiline
                                fullWidth={true}
                                rows={5}
                                onChange={handleInputChange}
                                value={articleData.content}
                                defaultValue="Enter Data here"
                            />

                        </Grid>
                        <Grid size={6}>
                            <Item>Images</Item>
                        </Grid>
                        <Grid size={6}>
                            <Item>Active: <Switch name="active" checked={articleData.active} onChange={handleInputChange} /></Item>

                        </Grid>
                        <Grid size={4}>
                            <Item>New Image</Item>
                        </Grid>
                        <Grid size={4}>
                            {isImageUploading && <LoadingSpinner />}
                            <input type="file" onChange={handleFileChange} />
                            <button onClick={handleUpload}>Upload</button>
                        </Grid>
                        <Grid size={12}>
                            {isLoading ? <LoadingSpinner /> : renderImagesComponent()}
                        </Grid>
                        <Grid size={6} />
                        <Grid size={3}>
                            <Button variant="contained" color="error" onClick={() => goToMainDashboard()}>Cancel</Button>
                        </Grid>
                        <Grid size={3}>
                            <Button variant="contained" color="success" disabled={!articleData.isDirty} onClick={handleSave}>Save</Button>
                        </Grid>

                    </Grid>
                </form>
            </Card>
        </div>
    </>
}

export default EditArticles;