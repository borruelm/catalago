import { ReactElement } from "react";
import { Button, Card, Grid2 as Grid } from "@mui/material";
import ImageComponent from "../shared/ImageComponent";
import {
    FacebookIcon,
    EmailIcon,
    WhatsappIcon
} from "react-share";
import { handleWhatsAppShare } from "../../utils/GlobalConstants";
import { Item } from "../shared/Item";
import { article } from "./ArticleInterfaces";



const SingleArticle = ({data, isSingle= false }:{ data:article, isSingle?:boolean}): ReactElement => {
    const shareMe = () => {
        return <>
            <EmailIcon />
            <FacebookIcon />
            <Button onClick={() => handleWhatsAppShare('hello', 'url')}>
                <WhatsappIcon round={true} />
            </Button>
        </>

    }

    const printComponent = () => {
        return <><Card sx={[
            {
                width: 'auto',
                textDecoration: 'underline',
            }]}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <Item>
                        <ImageComponent articleId={data.id} />
                    </Item>
                </Grid>
                <Grid size={4}>
                    <Item>Title</Item>
                </Grid>
                <Grid size={8}>
                    <Item>{data.title}</Item>
                </Grid>
                <Grid size={12}>
                    <Item>{data.content}</Item>
                </Grid>
                <Grid size={8} />
                <Grid size={4}>
                    <Item>
                        {isSingle ? shareMe() :
                            <Button title="Details" href={`/article/${data.id}`}>Details</Button>}</Item>
                </Grid>
            </Grid>
        </Card>
            <p />
        </>
    }

    return <>{data.active && printComponent()}</>

}

export default SingleArticle;