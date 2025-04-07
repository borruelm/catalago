import { ReactElement } from "react";
import { Button, Grid2 as Grid } from "@mui/material";
import { Item } from "../shared/Item";
import { useNavigate } from "react-router-dom";
import { article } from "./ArticleInterfaces";

const ArticlesPreview = ({ data }: { data: article[] }): ReactElement => {
    const navigate = useNavigate();

    const handleEdit = (article: article) => {
        navigate('/EditArticle', { state: { data: article } })
    }

    return <>
        <Grid container spacing={1}>
            <Grid size={2}>
                <Item>
                    ID
                </Item>
            </Grid>
            <Grid size={3}>
                <Item>
                    Title
                </Item>
            </Grid>
            <Grid size={5}>
                <Item>
                    Content
                </Item>
            </Grid>
            <Grid size={2}>
                <Item>
                    Action
                </Item>
            </Grid>
            {data.map((article: article) => {
                return <>
                    <Grid size={2}>
                        {article.id}
                    </Grid>
                    <Grid size={3}>
                        {article.title}
                    </Grid>
                    <Grid size={5}>
                        {article.content}
                    </Grid>
                    <Grid size={2}>
                        <Button onClick={() => handleEdit(article)}>Edit</Button>
                    </Grid>
                </>
            })}

        </Grid>
    </>
}

export default ArticlesPreview;