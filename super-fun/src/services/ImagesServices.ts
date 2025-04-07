import axios, { Axios } from "axios"
import { image } from "components/shared/SharedInterfaces"
import { SetStateAction } from "react"

export const getActiveImagesList = (setImageData: { (value: SetStateAction<image[]>): void; (arg0: any): any }, id: number) => {
    return axios.get('http://localhost/catalogmx/index.php/image/features?id=' + id)
        .then(response => setImageData(response?.data))
        .catch(error => console.error(error))
}

export const getAllImagesList = (setImageData: { (value: SetStateAction<image[]>): void; (arg0: any): any }, id: string) => {
    return axios.get('http://localhost/catalogmx/index.php/image/features?id=' + id + "&all=true")
        .then(response => setImageData(response?.data))
        .catch(error => console.error(error))
}

export const updImagesActive = async (id: any, active: number) => {

    return axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: 'http://localhost/catalogmx/index.php/image/features',
        data: { id: id, status: active === 1 ? 0 : 1 },
    }).then((responsex: any) => {
        console.info(responsex);
    }).catch(error => { console.error(error) });

}

export const saveImages = async (
    articleId: number,
    fileName: string,
    fileContent: any
) => {
    debugger
    return await axios({
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        url: 'http://localhost/catalogmx/index.php/image/features',
        data: { 
            articleId,
            fileName,
            fileContent
        },
    }).then((response) => response)
        .then(data => data)
        .catch(error => { console.error(error) });
}
