interface Avatar{
    default?: string;
    medium?: string;
    small?: string;
    extraSmall?: string;
}

interface User{
    id: string;
    displayName: string;
    username: string;
    avatar?: Avatar;
    bio?: string;
    followCount?: number;
    followersCount?: number;
    postsCount?: number;
    isFollowed?: boolean;
    isMine?: boolean;
}

interface Post{
    id: number;
    user: User;
    content: string;
    photo?: string;
    date: string;
    likesCount?: number;
    commentsCount?: number;
    isEdited: boolean;
    isLiked?: boolean;
    isMine?: boolean;
}

interface Comment {
    user: User;
    id: number;
    post: number;
    content: string;
    date: string;
    likesCount?: number;
    isLiked?: boolean;
    isMine?: boolean;
}

export type { Avatar, User, Post, Comment };