

export type Users = User[];

export type User = {
    login: string;
    location: string;
    name: string;
    email: string;
    twitter_username: string;
    public_repos: number;
    id: string;
    bio: string;
    company: string;
    blog: string;
    avatar_url: string;
    followers: number;
}