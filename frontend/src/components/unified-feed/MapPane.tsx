import { getLocationCoordinates, getLocationString } from '../../data/locationData';
import { Icon } from '../common';
import type { Post } from '../issues/PostCard';

interface MapPaneProps {
  posts: Post[];
  selectedPostKey: string | null;
  onSelectPost: (post: Post) => void;
}

const MAP_BOUNDS = {
  minLat: 4.2,
  maxLat: 13.5,
  minLng: 2.6,
  maxLng: 14.7,
};

function getMarkerPosition(post: Post) {
  if (!post.location) return null;
  const coordinates = getLocationCoordinates(post.location);
  if (!coordinates) return null;

  const left = ((coordinates.lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100;
  const top = 100 - ((coordinates.lat - MAP_BOUNDS.minLat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
  return { left, top };
}

function getMarkerClass(post: Post) {
  if (post.type !== 'issue') return 'bg-[#005129]';
  if (post.issueStatus === 'resolved' || post.issueStatus === 'closed') return 'bg-[#2e7d4c]';
  if (post.priority === 'urgent' || post.priority === 'high') return 'bg-[#d14d3a]';
  if (post.priority === 'medium') return 'bg-[#a07a18]';
  return 'bg-[#005129]';
}

export default function MapPane({ posts, selectedPostKey, onSelectPost }: MapPaneProps) {
  const mappedPosts = posts
    .map((post) => ({ post, position: getMarkerPosition(post) }))
    .filter((entry): entry is { post: Post; position: { left: number; top: number } } => Boolean(entry.position));

  return (
    <section className="bg-white p-5 shadow-[0_20px_42px_rgba(22,33,51,0.06)] ring-1 ring-[#e4e9f1]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="civic-label">Location context</p>
          <h3 className="mt-2 text-[1.6rem] font-black tracking-[-0.03em] text-[#162133]">Map view</h3>
          <p className="mt-3 text-sm leading-6 text-[#5a6b82]">
            See where reports and updates are happening across the map.
          </p>
        </div>

        <div className="bg-[#eef4ef] px-4 py-3 text-right">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#005129]">Mapped</p>
          <p className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#162133]">{mappedPosts.length}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_240px]">
        <div className="relative min-h-[460px] overflow-hidden bg-[linear-gradient(180deg,#f8f2e7_0%,#efe2cf_100%)]">
          <div className="absolute inset-0 opacity-60">
            <div className="absolute inset-6 bg-[linear-gradient(to_right,rgba(112,129,151,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(112,129,151,0.08)_1px,transparent_1px)] bg-[size:36px_36px]" />
          </div>
          <div className="absolute inset-[7%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.75)_0%,rgba(246,237,225,0.92)_56%,rgba(236,224,206,1)_100%)]" />
          <div className="absolute left-[19%] top-[10%] h-[70%] w-[60%] border border-[rgba(166,139,97,0.28)] bg-[linear-gradient(180deg,rgba(255,255,255,0.3),rgba(255,255,255,0.08))]" />

          {mappedPosts.map(({ post, position }) => {
            const selected = selectedPostKey === `${post.type}-${post.id}`;
            return (
              <button
                key={`${post.type}-${post.id}-marker`}
                onClick={() => onSelectPost(post)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 border-4 border-white shadow-[0_12px_28px_rgba(22,33,51,0.18)] transition ${
                  selected ? 'scale-125 ring-4 ring-[#dbe8df]' : 'hover:scale-110'
                } ${getMarkerClass(post)}`}
                style={{ left: `${position.left}%`, top: `${position.top}%` }}
                title={post.title || post.content.slice(0, 60)}
              >
                <span className="block size-4" />
              </button>
            );
          })}

          <div className="absolute bottom-4 left-4 bg-white/92 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#516277] shadow-[0_12px_28px_rgba(22,33,51,0.08)]">
            Nigeria map view
          </div>
        </div>

        <div className="space-y-3">
          {mappedPosts.slice(0, 5).map(({ post }) => (
            <button
              key={`${post.type}-${post.id}-legend`}
              onClick={() => onSelectPost(post)}
              className={`w-full p-4 text-left transition ${
                selectedPostKey === `${post.type}-${post.id}`
                  ? 'bg-[#eef4ef] ring-1 ring-[#c6d7ca]'
                  : 'bg-[#f9fafb] ring-1 ring-[#e6ebf2] hover:bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`mt-1 inline-flex size-3 shrink-0 ${getMarkerClass(post)}`} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#162133]">{post.title || post.content}</p>
                  {post.location && (
                    <p className="mt-1 text-xs leading-5 text-[#6d7b90]">{getLocationString(post.location)}</p>
                  )}
                </div>
              </div>
            </button>
          ))}

          {!mappedPosts.length && (
            <div className="bg-[#f6f7fb] p-5 text-sm leading-6 text-[#5a6b82] ring-1 ring-[#e6ebf2]">
              No mapped posts are visible in the current view.
            </div>
          )}

          <div className="bg-[#fff8ea] p-4 text-sm leading-6 text-[#7b6532] ring-1 ring-[#ead9a8]">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]">
              <Icon name="verified_user" className="text-base" />
              Map note
            </div>
            This preview can be upgraded to full live mapping in a later pass.
          </div>
        </div>
      </div>
    </section>
  );
}
