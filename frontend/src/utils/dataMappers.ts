import type{ Issue, Post as BackendPost } from '../types';
import type{ Post } from '../components/issues/PostCard';

/**
 * Convert backend Issue to frontend Post format
 */
export const convertIssueToPost = (issue: Issue): Post => {
  const createdByRole = issue.created_by.role === 'official' ? 'official' : 'citizen';
  return {
    id: String(issue.id),
    title: issue.title,
    type: 'issue',
    author: {
      id: String(issue.created_by.id),
      name: `${issue.created_by.first_name} ${issue.created_by.last_name}`.trim() || issue.created_by.username,
      username: `@${issue.created_by.username}`,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', // Default avatar
      verified: createdByRole === 'official',
      role: createdByRole,
    },
    content: issue.description,
    image: issue.image_url,
    scope: issue.scope,
    timestamp: formatTime(new Date(issue.created_at)),
    stats: {
      comments: issue.comment_count || 0,
      shares: 0,
      likes: issue.upvotes || 0,
    },
    liked: false,
    bookmarked: false,
    issueStatus: issue.status,
    issueCategory: issue.category,
    location: {
      state: issue.state,
      lga: issue.lga,
      ward: issue.ward,
    },
    priority: issue.priority,
    assignedTo: issue.assigned_to ? {
      id: String(issue.assigned_to.id),
      name: `${issue.assigned_to.first_name} ${issue.assigned_to.last_name}`.trim() || issue.assigned_to.username,
      role: 'official',
    } : undefined,
  };
};

/**
 * Convert backend Post to frontend Post format
 */
export const convertBackendPostToPost = (backendPost: BackendPost): Post => {
  const authorRole = backendPost.author.role === 'official' ? 'official' : 'citizen';
  return {
    id: String(backendPost.id),
    type: 'post',
    author: {
      id: String(backendPost.author.id),
      name: `${backendPost.author.first_name} ${backendPost.author.last_name}`.trim() || backendPost.author.username,
      username: `@${backendPost.author.username}`,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', // Default avatar
      verified: authorRole === 'official',
      role: authorRole,
    },
    content: backendPost.content,
    image: backendPost.image_url,
    scope: 'local', // Default scope for posts
    timestamp: formatTime(new Date(backendPost.created_at)),
    stats: {
      comments: backendPost.comments || 0,
      shares: backendPost.shares || 0,
      likes: backendPost.likes || 0,
    },
    liked: false,
    bookmarked: false,
  };
};

/**
 * Format timestamp to relative time (e.g., "2h", "3d")
 */
export const formatTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  if (diffWeeks < 4) return `${diffWeeks}w`;
  if (diffMonths < 12) return `${diffMonths}mo`;
  return `${Math.floor(diffMonths / 12)}y`;
};
