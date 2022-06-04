import { Box } from "@mui/system";
import { ExplorePageTabs } from "../components/explore";
import { PageLabel, PageShowMore } from "../components/page";
import { FeedPost } from "../components/post";
import { UserRecommendation } from "../components/user";

const Explore = () => {
    return(
        <Box>
            <ExplorePageTabs />
            <PageLabel>Tomates to follow</PageLabel>
            <UserRecommendation />
            <UserRecommendation />
            <UserRecommendation />
            <PageShowMore />
            <PageLabel>Latest Posts</PageLabel>
            <FeedPost />
            <FeedPost />
            <FeedPost />
        </Box>
    )
}

export default Explore;