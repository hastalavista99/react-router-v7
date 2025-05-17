import { Form, redirect, useFetcher } from "react-router";
import type { Route } from "./+types/post";

export async function clientLoader({ params }: Route.LoaderArgs) {
    const { postId } = params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return await res.json();;
}

export async function clientAction({ params }: Route.ClientActionArgs) {
    try {
        const { postId } = params;
        await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: "DELETE",
        });

        return { isDeleted: true };
    } catch (error) {
        console.error("Error deleting post:", error);
        return { isDeleted: false };
    }


}

const Post = ({ loaderData }: Route.ComponentProps) => {
    const fetcher = useFetcher();

    const isDeleted = fetcher.data?.isDeleted;
    return (
        <div>
            {" "}
            {!isDeleted && (
                <>
                    <p>Title: {loaderData.title}</p>
                    <p>Body: {loaderData.body}</p>
                </>
            )}

            <fetcher.Form method="delete">
                <button type="submit">Delete</button>
            </fetcher.Form>
        </div>
    )
}

export default Post