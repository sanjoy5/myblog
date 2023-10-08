
import { getAuthSession } from "@/utills/auth";
import prisma from "@/utills/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1; // Ensure `page` is an integer, default to 1 if not provided
    const cat = searchParams.get("cat");

    const POSTS_PER_PAGE = 3;

    const query = {
        take: POSTS_PER_PAGE,
        skip: POSTS_PER_PAGE * (page - 1),
        where: {
            ...(cat && { catSlug: cat }),
        },
    };

    try {

        // Fetch posts and count using Prisma
        const [posts, count] = await Promise.all([
            prisma.post.findMany(query),
            prisma.post.count({ where: query.where }),
        ]);

        return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
    } catch (err) {
        console.error(err);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};



// Create a POst
export const POST = async (req) => {

    const session = await getAuthSession()

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "Not Authenticated" }, { status: 401 })
        )
    }

    try {
        const body = await req.json()
        const post = await prisma.post.create({
            data: { ...body, userEmail: session.user.email }
        })

        return new NextResponse(
            JSON.stringify(post, { status: 200 })
        )

    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }, { status: 500 })
        )
    }
}