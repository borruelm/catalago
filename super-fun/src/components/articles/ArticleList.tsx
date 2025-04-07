import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import SingleArticle from "./SingleArticle";
import { article } from "./ArticleInterfaces";
import { getArticleList } from "../../services/ArticleServices";
import { isEmpty } from "lodash";

const ArticleList = () => {
    const firstRender = useRef(false);
    const [isLoading, setIsLoading] = useState(true);
    const [articleData, setArticleData] = useState<article[]>([]);

    const getData = () => {
        getArticleList(setArticleData);
        setTimeout(() => { setIsLoading(false); }, 500)
    }

    const printArtilces = () => {
        if (!isEmpty(articleData)) {
            return articleData.map(
                (articleElement: article) => <SingleArticle data={articleElement} />
            );
        }
        return <p>No Data Available</p>
    }

    useEffect(() => {
        if (firstRender) {
            getData();
        }
    }, [firstRender])

    return (<div style={{ maxWidth: '900px', minWidth: '380px', marginInline: 'auto' }}>
        {isLoading ? <LoadingSpinner /> : printArtilces()}
    </div>)

}

export default ArticleList;