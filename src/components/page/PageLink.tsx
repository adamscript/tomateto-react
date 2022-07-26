import { Box, Dialog, DialogContent, DialogTitle, IconButton, Slide, Stack, styled, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { auth } from "../../firebase";
import { UserRecommendation } from "../user";
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TransitionProps } from "@mui/material/transitions";
import { format, intervalToDuration, parseISO } from "date-fns";
import { Comment, Post, User } from "../../features/utility/types";
import { openSnackbarError } from "../../features/app/snackbarSlice";
import insertErrorLog from "../../features/utility/errorLogging";

const LinkTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    fontSize: 14,
    '&:hover': {
        textDecoration: 'underline'
    }
})) as typeof Typography;

const LinkTypographyNumber = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: 14
})) as typeof Typography;

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
  ) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

interface PageLinkProps {
    items: Post | Comment | User;
    comment?: boolean;
    following?: boolean;
    followers?: boolean;
    likes?: boolean;
    user?: boolean;
    post?: boolean;
}

function instanceOfPost(object:any): object is Post {
    return 'id' in object;
}

function instanceOfComment(object:any): object is Comment {
    return 'id' in object;
} 

function instanceOfUser(object:any): object is User {
    return 'id' in object;
}

const PageLink = (props: PageLinkProps) => {
    const location = useLocation();

    const getPostDate = () => {
        if(instanceOfPost(props.items) || instanceOfComment(props.items)){
            let postDate = parseISO(props.items.date);
            let interval = intervalToDuration({ start: postDate, end: Date.now() });
    
            if(interval.years){
                return (format(postDate, 'PP'));
            }
            else if(interval.days && interval.days >= 7 || interval.months){
                return (format(postDate, 'MMM d'));
            }
            else if(interval.days){
                return (`${interval.days}d`);
            }
            else if(interval.hours){
                return (`${interval.hours}h`);
            }
            else if(interval.minutes){
                return (`${interval.minutes}m`);
            }
            else if(interval.seconds){
                return (`${interval.seconds}s`);
            }
        }

    }

    return(
        <Box zIndex={1}>
            {
                (props.comment && instanceOfComment(props.items) && <LinkTypography noWrap component={Link} to={`/${props.items.user.username}/post/${props.items.post}`} state={{ location: location }} sx={{ fontSize: 16 }}>{getPostDate()}</LinkTypography>) ||
                (props.following && instanceOfUser(props.items) && <LinkTypography component={Link} to="following" state={{ backgroundLocation: location, user: props.items.id }}><LinkTypographyNumber display="inline">{props.items.followCount}</LinkTypographyNumber> Following{ props.items.followCount && props.items.followCount > 1 ? 's' : '' }</LinkTypography>) ||
                (props.followers && instanceOfUser(props.items) && <LinkTypography component={Link} to="followers" state={{ backgroundLocation: location, user: props.items.id }}><LinkTypographyNumber display="inline">{props.items.followersCount}</LinkTypographyNumber> Follower{ props.items.followersCount && props.items.followersCount > 1 ? 's' : '' }</LinkTypography>) ||
                (props.likes && instanceOfPost(props.items) && props.items.likesCount && <LinkTypography component={Link} to="likes" state={{ backgroundLocation: location, post: props.items.id }}><LinkTypographyNumber display="inline">{props.items.likesCount}</LinkTypographyNumber> Like{ props.items.likesCount > 1 && 's' }</LinkTypography>) ||
                (props.user && instanceOfUser(props.items) && <LinkTypography noWrap component={Link} to={`/${props.items.username}`} state={{ location: location }} sx={{ color: theme => theme.palette.text.primary, fontWeight: '700', fontSize: 16 }}>{props.items.displayName}</LinkTypography>) ||
                (props.post && instanceOfPost(props.items) &&
                <Tooltip title={format(parseISO(props.items.date), "PPPP 'at' HH:mm")}>
                    <LinkTypography noWrap component={Link} to={`/${props.items.user.username}/post/${props.items.id}`} state={{ location: location }} sx={{ fontSize: 16 }}>{getPostDate()}</LinkTypography>
                </Tooltip>)
            }
        </Box>
    )
}

interface PageLinkModalProps {
    following?: boolean;
    followers?: boolean;
    likes?: boolean;
}

const PageLinkModal = (props: PageLinkModalProps) => {
    const [response, setResponse] = useState<User[]>([]);
    const [isLoaded, setLoaded] = useState(false);

    const authState = useAppSelector((state) => state.authState)
    const dispatch = useAppDispatch();
    
    const navigate = useNavigate();
    const { username, postId } = useParams();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const listUser = response.map((items, index) =>
        <UserRecommendation key={index} items={items} />
    )

    const handleClose = () => {
        navigate("..");
    }

    useEffect(() => {

        function fetchListUserFollowing(res?: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/user/${username}/follows`, {
                mode: 'cors',
                headers: {'Authorization': res ? `Bearer ${res}` : 'none'}
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                handleFetchSuccess(res.items);
            })
            .catch((err) => {
                dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
                insertErrorLog("Fetching user following / fetchListUserFollowing / PageLinkModal", err);
            })
        }

        function fetchListUserFollowers(res?: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/user/${username}/followers`, {
                mode: 'cors',
                headers: {'Authorization': res ? `Bearer ${res}` : 'none'}
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                handleFetchSuccess(res.items);
            })
            .catch((err) => {
                dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
                insertErrorLog("Fetching user followers / fetchListUserFollowers / PageLinkModal", err);
            })
        }

        function fetchListPostLikes(res?: string){
            fetch(`${process.env.REACT_APP_API_URL}/api/post/content/${postId}/likes`, {
                mode: 'cors',
                headers: {'Authorization': res ? `Bearer ${res}` : 'none'}
            })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                handleFetchSuccess(res.items);
            })
            .catch((err) => {
                dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
                insertErrorLog("Fetching post likes / fetchListPostLikes / PageLinkModal", err);
            })
        }

        function handleFetchSuccess(res: User[]){
            setResponse(res);
            setLoaded(true)
        }

        function handleFetch(res?: string){
            if(props.following){
                res ? fetchListUserFollowing(res) : fetchListUserFollowing();
            }
            else if(props.followers){
                res ? fetchListUserFollowers(res) : fetchListUserFollowers();
            }
            else if(props.likes){
                res ? fetchListPostLikes(res) : fetchListPostLikes();
            }
        }
        
        if(authState.isLoggedIn){
            auth.currentUser?.getIdToken()
            .then((res) => {
                handleFetch(res);
            })
            .catch((err) => {
                dispatch(openSnackbarError("An error occurred while processing your request. Please try again later."));
                insertErrorLog("Get id token / PageLinkModal", err);
            })
        }
        else{
            handleFetch();
        }

    }, []);

    return(
        <Box>
            <Dialog open fullScreen={ smDown ? true : false } fullWidth maxWidth="sm" onClose={handleClose}
                PaperProps={{ sx: { maxHeight: smDown ? '100%' : 600 } }}
                TransitionComponent={ smDown ? Transition : undefined }>
                <DialogTitle sx={{ pt: 1, pl: 1, pb: 1 }}>
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <IconButton onClick={handleClose}>
                            { smDown ? <ArrowBackIcon /> : <CloseIcon /> }
                        </IconButton>
                        {
                            (props.following && <Typography variant='h6'>Following</Typography>) ||
                            (props.followers && <Typography variant='h6'>Followers</Typography>) ||
                            (props.likes && <Typography variant='h6'>Liked by</Typography>)
                        }
                    </Stack>
                </DialogTitle>
                <DialogContent sx={{ p: smDown ? 0 : 1 }}>
                    { isLoaded && listUser }
                </DialogContent>
            </Dialog>
        </Box>
    )
}

export { PageLink, PageLinkModal };