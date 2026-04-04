import PostCard, { type Post } from '../issues/PostCard';

interface FeedListProps {
  posts: Post[];
  emptyTitle: string;
  emptyDescription: string;
  onLike: (id: string) => void;
  onComment: (id: string) => void;
  onShare: (id: string) => void;
  onBookmark: (id: string) => void;
}

export default function FeedList({
  posts,
  emptyTitle,
  emptyDescription,
  onLike,
  onComment,
  onShare,
  onBookmark,
}: FeedListProps) {
  if (posts.length === 0) {
    return (
      <div className="px-4 py-10 lg:px-6">
        <div className="civic-panel px-6 py-12 text-center">
          <div className="mx-auto flex size-16 items-center justify-center bg-[#f3ede4]">
            <span className="material-symbols-outlined text-4xl text-[#8a97a8]">travel_explore</span>
          </div>
          <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-[#162133]">{emptyTitle}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5a6b82]">{emptyDescription}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={`${post.type}-${post.id}`}>
          <PostCard
            post={post}
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
            onBookmark={onBookmark}
          />
        </div>
      ))}
    </div>
  );
}
