# Quick Reference: Implementation Examples

## TimelinePage - Before & After

### BEFORE (Using MainLayout)
```typescript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout, Icon } from '../components/common';
import PostCard from '../components/issues/PostCard';
import PostComposer from '../components/issues/PostComposer';

export default function TimelinePage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('all');
  // ... other state ...

  return (
    <MainLayout>
      {/* Sticky Header with Search and Filters */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-navy-950/80">
        {/* Search Bar */}
        {/* Filter Tabs */}
      </div>

      {/* Post Composer */}
      <PostComposer {...} />

      {/* Feed Content */}
      {/* Posts rendering */}
    </MainLayout>
  );
}
```

**Problem:** No left sidebar to organize filters - everything packed into sticky header

---

### AFTER (Using ChatGPTLayout)
```typescript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/common';
import ChatGPTLayout from '../layouts/ChatGPTLayout';
import TimelineLeftSidebar from '../components/timeline/TimelineLeftSidebar';
import PostCard from '../components/issues/PostCard';
import PostComposer from '../components/issues/PostComposer';

export default function TimelinePage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('all');
  // ... other state ...

  // NEW: Create left sidebar component
  const leftSidebar = (
    <TimelineLeftSidebar
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      stats={{
        trending: filteredPosts.length,
        issues: posts.filter(p => p.type === 'issue').length,
        updates: posts.filter(p => p.type === 'post').length,
      }}
    />
  );

  // NEW: Organize main content
  const mainContent = (
    <div className="flex flex-col">
      {/* Sticky Header - Only search now */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-navy-950/80">
        {/* Just Search Bar - Filters moved to sidebar */}
      </div>

      {/* Post Composer */}
      <PostComposer {...} />

      {/* Feed Content */}
      {/* Posts rendering */}
    </div>
  );

  // NEW: Return with ChatGPTLayout
  return (
    <ChatGPTLayout
      leftSidebar={leftSidebar}
      showRightSidebar={true}
    >
      {mainContent}
    </ChatGPTLayout>
  );
}
```

**Benefits:**
- ✓ Dedicated left sidebar for filters and navigation
- ✓ Cleaner header (only search)
- ✓ Organized information hierarchy
- ✓ Professional ChatGPT-like layout
- ✓ Resizable and collapsible sidebars
- ✓ Better use of screen space

---

## SettingsPage - Quick Implementation

### Current Structure (MainLayout)
```typescript
<MainLayout showRightSidebar={false}>
  {/* Header */}
  <div className="sticky top-0 z-20">Settings</div>

  {/* All sections in main content */}
  <div className="space-y-1">
    {/* Appearance section */}
    {/* Notifications section */}
    {/* Account section */}
    {/* Privacy section */}
    {/* Sessions section */}
    {/* Activity section */}
    {/* Danger Zone */}
  </div>
</MainLayout>
```

**Problem:** Very long scrollable page, hard to navigate to specific sections

---

### New Structure (ChatGPTLayout)
```typescript
import ChatGPTLayout from '../layouts/ChatGPTLayout';
import SettingsLeftSidebar from '../components/settings/SettingsLeftSidebar';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('appearance');

  const leftSidebar = (
    <SettingsLeftSidebar
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    />
  );

  const mainContent = (
    <div className="flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20">Settings</div>

      {/* Only show active section */}
      <div className="space-y-6 p-6">
        {activeSection === 'appearance' && renderAppearanceSection()}
        {activeSection === 'notifications' && renderNotificationsSection()}
        {activeSection === 'account' && renderAccountSection()}
        {activeSection === 'privacy' && renderPrivacySection()}
        {activeSection === 'sessions' && renderSessionsSection()}
        {activeSection === 'activity' && renderActivitySection()}
        {activeSection === 'danger' && renderDangerZone()}
      </div>
    </div>
  );

  return (
    <ChatGPTLayout
      leftSidebar={leftSidebar}
      showRightSidebar={false}
    >
      {mainContent}
    </ChatGPTLayout>
  );
}
```

**Benefits:**
- ✓ Quick navigation via left sidebar
- ✓ Only shows one section at a time
- ✓ No long scrolling
- ✓ Professional navigation pattern
- ✓ Easy to add more sections later

---

## NotificationsPage - Quick Template

```typescript
import { useState } from 'react';
import ChatGPTLayout from '../layouts/ChatGPTLayout';
import NotificationsLeftSidebar from '../components/notifications/NotificationsLeftSidebar';

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const leftSidebar = (
    <NotificationsLeftSidebar
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      unreadCount={{
        mentions: 5,
        replies: 3,
        likes: 12,
        follows: 2,
      }}
    />
  );

  const notifications = getFilteredNotifications(activeFilter);

  return (
    <ChatGPTLayout
      leftSidebar={leftSidebar}
      showRightSidebar={false}
    >
      <div className="space-y-4 p-6">
        {/* Your notification list */}
        {notifications.map(notif => (
          <NotificationCard key={notif.id} notification={notif} />
        ))}
      </div>
    </ChatGPTLayout>
  );
}
```

---

## MessagesPage - Quick Template

```typescript
import { useState } from 'react';
import ChatGPTLayout from '../layouts/ChatGPTLayout';
import MessagesLeftSidebar from '../components/messages/MessagesLeftSidebar';

export default function MessagesPage() {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const leftSidebar = (
    <MessagesLeftSidebar
      activeConversationId={activeConversationId}
      onConversationSelect={setActiveConversationId}
    />
  );

  return (
    <ChatGPTLayout
      leftSidebar={leftSidebar}
      showRightSidebar={false}
    >
      <div className="flex flex-col h-full">
        {activeConversationId ? (
          <ChatWindow conversationId={activeConversationId} />
        ) : (
          <EmptyState />
        )}
      </div>
    </ChatGPTLayout>
  );
}
```

---

## Common Sidebar Component Pattern

All sidebar components follow this structure:

```typescript
interface [Page]LeftSidebarProps {
  // State props
  activeSection: string;
  onSectionChange: (section: string) => void;

  // Optional data props
  stats?: SomeStats;
  count?: number;
  // ...
}

export default function [Page]LeftSidebar(props) {
  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div>
        <h2 className="text-lg font-bold">Title</h2>
        <p className="text-xs text-slate-500">Description</p>
      </div>

      {/* 2. Main Content Section */}
      <div className="space-y-2">
        {/* Buttons, filters, navigation items */}
      </div>

      {/* 3. Optional Divider & Secondary Section */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-navy-700">
        {/* More items or actions */}
      </div>

      {/* 4. Optional Info/Help Box */}
      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3">
        {/* Help text or tip */}
      </div>
    </div>
  );
}
```

---

## Page Update Checklist

For each page you want to update:

- [ ] Create left sidebar component in `/components/[feature]/`
- [ ] Import ChatGPTLayout in the page
- [ ] Import the new sidebar component
- [ ] Create `leftSidebar` variable with component instance
- [ ] Organize main content in separate variable
- [ ] Replace `<MainLayout>` with `<ChatGPTLayout>`
- [ ] Pass `leftSidebar` and `showRightSidebar` props
- [ ] Test sidebar collapse/expand
- [ ] Test sidebar resizing
- [ ] Test dark mode
- [ ] Test mobile responsiveness

---

## Code Snippet Library

### Button with Icon (Filter Style)
```typescript
<button
  onClick={() => onFilterChange(filterId)}
  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
    isActive
      ? 'bg-primary/15 border border-primary/50'
      : 'hover:bg-slate-100 dark:hover:bg-navy-800 border border-transparent'
  }`}
>
  <div className={`${colorClass} p-2 rounded-md flex items-center justify-center`}>
    <Icon name={iconName} className="text-base" />
  </div>
  <span className="text-sm font-medium">{label}</span>
</button>
```

### Stat Card (Gradient Background)
```typescript
<div className="bg-gradient-to-br from-color-50 to-color-100 dark:from-color-900/20 dark:to-color-800/20 rounded-lg p-3 border border-color-200 dark:border-color-700">
  <div className="flex items-center gap-2">
    <Icon name="icon_name" className="text-color-600 dark:text-color-400" />
    <div className="flex-1">
      <p className="text-xs font-semibold">Label</p>
      <p className="text-lg font-bold text-color-600 dark:text-color-400">Value</p>
    </div>
  </div>
</div>
```

### Divider Section
```typescript
<div className="space-y-3 pt-4 border-t border-slate-200 dark:border-navy-700">
  <h3 className="text-sm font-semibold px-1">Section Title</h3>
  {/* Section content */}
</div>
```

### Help/Info Box
```typescript
<div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 space-y-2 border border-blue-200 dark:border-blue-700">
  <p className="text-xs font-semibold text-blue-900 dark:text-blue-300">Tip</p>
  <p className="text-xs text-blue-700 dark:text-blue-400">Help text here</p>
</div>
```

---

## Quick Start: 5-Minute Page Update

1. **Copy a sidebar component** and rename it
2. **Update the props** to match your page needs
3. **Import ChatGPTLayout** and the sidebar
4. **Wrap your return statement** with ChatGPTLayout
5. **Test** - it should work!

Example (ExplorePage):
```typescript
// 1. Create /components/explore/ExploreLeftSidebar.tsx
// 2. In ExplorePage.tsx:
import ChatGPTLayout from '../layouts/ChatGPTLayout';
import ExploreLeftSidebar from '../components/explore/ExploreLeftSidebar';

// 3. In return:
return (
  <ChatGPTLayout
    leftSidebar={<ExploreLeftSidebar activeTab={activeTab} onTabChange={setActiveTab} />}
    showRightSidebar={true}
  >
    {/* Your existing content */}
  </ChatGPTLayout>
);
```

Done! ✓

---

## File Locations Reference

```
Left Sidebar Components:
├── /components/timeline/TimelineLeftSidebar.tsx
├── /components/settings/SettingsLeftSidebar.tsx
├── /components/notifications/NotificationsLeftSidebar.tsx
├── /components/explore/ExploreLeftSidebar.tsx
├── /components/messages/MessagesLeftSidebar.tsx
├── /components/saved/SavedLeftSidebar.tsx
├── /components/posts/PostDetailsLeftSidebar.tsx
├── /components/issues/IssueDetailsLeftSidebar.tsx
├── /components/profile/OfficialProfileLeftSidebar.tsx
└── /components/dashboard/OfficialDashboardLeftSidebar.tsx

Core Layout:
└── /layouts/ChatGPTLayout.tsx

Documentation:
├── /CHATGPT_LAYOUT_GUIDE.md
├── /IMPLEMENTATION_SUMMARY.md
└── /QUICK_REFERENCE.md (this file)
```

---

Created: 2026-03-16
Quick reference for ChatGPT Layout implementation across all pages.
