import { ReactElement } from "react";
import AccountMenu from "../components/shared/Menu";
import ArticleList from "../components/articles/ArticleList";

const LandingPage = (): ReactElement => {

    return <p>
        <AccountMenu />
        <ArticleList />
    </p>

}

export default LandingPage;