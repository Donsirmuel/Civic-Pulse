import { getLocationString } from '../../data/locationData';
import { Icon } from '../common';
import type { Post } from '../issues/PostCard';

interface PostDetailPanelProps {
  post: Post | null;
}

const statusLabels = {
  reported: 'Reported',
  under_review: 'Under Review',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed',
};

export default function PostDetailPanel({ post }: PostDetailPanelProps) {
  if (!post) {
    return (
      <div className="space-y-5">
        <section className="bg-white p-5 shadow-[0_16px_32px_rgba(22,33,51,0.06)] ring-1 ring-[#e4e9f1]">
          <p className="civic-label">Issue summary</p>
          <h3 className="mt-3 text-xl font-black tracking-[-0.03em] text-[#162133]">
            Select a public record
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#5a6b82]">
            The selected issue or official update will appear here with context, assignment, and
            engagement signals.
          </p>
        </section>

        <section className="bg-[#eef4ef] p-5">
          <p className="civic-label">Operational note</p>
          <p className="mt-3 text-sm leading-6 text-[#55657b]">
            The right rail is reserved for structured review, not casual browsing. Select a record
            from the feed to inspect it in full.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <section className="bg-white p-5 shadow-[0_16px_32px_rgba(22,33,51,0.06)] ring-1 ring-[#e4e9f1]">
        <p className="civic-label">Issue summary</p>
        <h3 className="mt-3 text-[1.9rem] font-black leading-tight tracking-[-0.04em] text-[#162133]">
          {post.title || post.content.slice(0, 90)}
        </h3>
        <p className="mt-4 text-[15px] leading-7 text-[#516277]">{post.content}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="bg-[#f3ede4] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5d6877]">
            {post.scope}
          </span>
          {post.type === 'issue' && post.issueStatus && (
            <span className="bg-[#e8f1eb] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#005129]">
              {statusLabels[post.issueStatus]}
            </span>
          )}
          {post.issueCategory && (
            <span className="bg-[#f4f6f9] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#55657b]">
              {post.issueCategory}
            </span>
          )}
          {post.priority && post.type === 'issue' && (
            <span className="bg-[#fff8ea] px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8b6a16]">
              {post.priority} priority
            </span>
          )}
        </div>
      </section>

      <section className="bg-white p-5 shadow-[0_16px_32px_rgba(22,33,51,0.06)] ring-1 ring-[#e4e9f1]">
        <p className="civic-label">Operational context</p>
        <div className="mt-5 space-y-5 text-sm">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center bg-[#eef4ef] text-[#005129]">
              <Icon name="person" className="text-[1.1rem]" />
            </div>
            <div>
              <p className="font-bold text-[#162133]">{post.author.name}</p>
              <p className="mt-1 text-[#6d7b90]">{post.author.username}</p>
            </div>
          </div>

          {post.location && (
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center bg-[#eef4ef] text-[#005129]">
                <Icon name="location_on" className="text-[1.1rem]" />
              </div>
              <div>
                <p className="font-bold text-[#162133]">Location</p>
                <p className="mt-1 text-[#6d7b90]">{getLocationString(post.location)}</p>
              </div>
            </div>
          )}

          {post.assignedTo && (
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center bg-[#fff8ea] text-[#8b6a16]">
                <Icon name="workspace_premium" className="text-[1.1rem]" />
              </div>
              <div>
                <p className="font-bold text-[#162133]">Assigned official</p>
                <p className="mt-1 text-[#6d7b90]">{post.assignedTo.name}</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white p-5 shadow-[0_16px_32px_rgba(22,33,51,0.06)] ring-1 ring-[#e4e9f1]">
        <p className="civic-label">Engagement signal</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="bg-[#f6f7fb] p-4 text-center">
            <p className="text-2xl font-black tracking-[-0.03em] text-[#162133]">{post.stats.likes}</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a8799]">Supports</p>
          </div>
          <div className="bg-[#f6f7fb] p-4 text-center">
            <p className="text-2xl font-black tracking-[-0.03em] text-[#162133]">{post.stats.comments}</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a8799]">Comments</p>
          </div>
          <div className="bg-[#f6f7fb] p-4 text-center">
            <p className="text-2xl font-black tracking-[-0.03em] text-[#162133]">{post.stats.shares}</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a8799]">Shares</p>
          </div>
        </div>
      </section>
    </div>
  );
}
