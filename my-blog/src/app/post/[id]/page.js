import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function PostPage({ params }) {
    const res = await fetch(`http://localhost:3002/api/posts/${params.id}`, { cache: "no-store" });
    const post = await res.json();

    if (!post) {
        return (
          <div className="text-center">
            <p className="mb-4 text-lg">글을 찾을 수 없습니다.</p>
            <Button asChild>
              <Link href="/">목록으로</Link>
            </Button>
          </div>
        );
    }

    return (
        <div className="w-full">
            <Button asChild variant="outline" className="mb-8">
                <Link href="/">← 목록으로</Link>
            </Button>
            <Card className="w-full">
                <CardHeader className="border-b">
                    <CardTitle className="text-3xl font-bold mb-2">{post.title}</CardTitle>
                    <CardDescription>작성자: {post.author} {/* Add date here if available: • {post.date} */}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none whitespace-pre-wrap">
                        {post.content}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}