import axios from "axios";
import { article } from "components/articles/ArticleInterfaces";
import { SetStateAction } from "react";

//Get all active articles
export const getArticleList = (setArticleData: { (value: SetStateAction<article[]>): void; (value: SetStateAction<article[]>): void; (arg0: any): any; }) => {
    return axios.get('http://localhost/catalogmx/index.php/article/features')
        .then(response => setArticleData(response?.data))
        .catch(error => console.error(error))
}

export const getArticleDetails = (setArticleData: { (value: SetStateAction<article[]>): void; (arg0: any): any; }, articleId: string) => {
    return axios.get('http://localhost/catalogmx/index.php/article/features?id=' + articleId)
        .then(response => setArticleData(response?.data))
        .catch(error => console.error(error))
}
