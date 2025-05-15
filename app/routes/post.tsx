import type { Route } from "./+types/post";

export async function loader({ params }: Route.LoaderArgs) {
    const { postId } = params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await res.json();
    return {postId};
}

const Post = ({loaderData} :Route.ComponentProps) => {
    return (
        <div>Post id: {loaderData.postId}</div>
    )
}

export default Post