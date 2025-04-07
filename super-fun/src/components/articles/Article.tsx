import { Button, Card } from "@mui/material";
import LoadingSpinner from "../shared/LoadingSpinner";
import { useLocation } from "react-router-dom";
import { getArticleDetails } from "../../services/ArticleServices";
import { isEmpty } from "lodash";
import SingleArticle from "./SingleArticle";
import { article } from "./ArticleInterfaces";
import { ReactElement, useCallback, useEffect, useState } from "react";


const Article = (): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [articleData, setArticleData] = useState<article[]>([]);
    let location = useLocation();

    const fetchArticleData = useCallback(() => {
        const qryParam = location.pathname.split("/");
        getArticleDetails(setArticleData, qryParam[2]);
        setTimeout(() => { setIsLoading(false); }, 500)
    }, [location.pathname]);

    const renderArticle = () => {
        if (!isEmpty(articleData)) {
            debugger
            return articleData.map(article => {
                return <SingleArticle data={article} isSingle={true} />
            });
        } else
            return <><p>Not found!</p></>

    }

    useEffect(() => {
        if (isLoading) {
            fetchArticleData();
        }
    }, [isLoading, fetchArticleData])

    return <>
        <div style={{ margin: 'auto', maxWidth: 960, minWidth: 380 }}>
            <Card>
                <Button href="/"> Go back</Button>
                {isLoading ? <LoadingSpinner /> : renderArticle()}
            </Card>
        </div>
    </>

}

export default Article;