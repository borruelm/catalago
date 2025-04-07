import { ReactElement, useCallback, useEffect, useState } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import { article } from "./ArticleInterfaces";
import { getArticleList } from "../../services/ArticleServices";
import ArticlesPreview from "./ArticlesPreview";

const ActiveArticles = (): ReactElement => {
    const [articleData, setArticleData] = useState<article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = useCallback(() => {
        getArticleList(setArticleData);
        setTimeout(() => { setIsLoading(false); }, 500)
    }, [setArticleData]);

    useEffect(() => {
        getData();
    }, [getData]);

    return <>
        {isLoading && <LoadingSpinner />}
        {
            <ArticlesPreview data={articleData} />
        }
    </>
}

export default ActiveArticles;