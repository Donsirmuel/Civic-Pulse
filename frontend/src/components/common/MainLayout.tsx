import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import MobileNav from './MobileNav';
import MobileHeader from './MobileHeader';

interface MainLayoutProps {
  children: ReactNode;
  showRightSidebar?: boolean;
}

export default function MainLayout({ children, showRightSidebar = true }: MainLayoutProps) {
  const [leftWidth, setLeftWidth] = useState(() => {
    const saved = localStorage.getItem('leftSidebarWidth');
    return saved ? parseInt(saved) : 256;
  });
  const [rightWidth, setRightWidth] = useState(() => {
    const saved = localStorage.getItem('rightSidebarWidth');
    return saved ? parseInt(saved) : 350;
  });
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Save to localStorage when widths change
  useEffect(() => {
    localStorage.setItem('leftSidebarWidth', leftWidth.toString());
  }, [leftWidth]);

  useEffect(() => {
    localStorage.setItem('rightSidebarWidth', rightWidth.toString());
  }, [rightWidth]);

  // Handle left resize
  useEffect(() => {
    if (!isResizingLeft) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;
      const clampedWidth = Math.max(200, Math.min(400, newWidth));
      setLeftWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsResizingLeft(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingLeft]);

  // Handle right resize
  useEffect(() => {
    if (!isResizingRight) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = containerRect.right - e.clientX;
      const clampedWidth = Math.max(280, Math.min(500, newWidth));
      setRightWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsResizingRight(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingRight]);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display">
      {/* Mobile Header - only visible on mobile */}
      <MobileHeader />

      <div
        ref={containerRef}
        className={`max-w-[1280px] mx-auto flex justify-center min-h-screen relative ${
          (isResizingLeft || isResizingRight) ? 'select-none' : ''
        }`}
      >
        {/* Left Sidebar - hidden on mobile/tablet, visible on lg+ */}
        <div className="hidden lg:block relative" style={{ width: `${leftWidth}px` }}>
          <Sidebar />
          {/* Left Resize Handle */}
          <div
            onMouseDown={() => setIsResizingLeft(true)}
            className="absolute top-0 right-0 w-2 h-full cursor-col-resize hover:bg-primary/20 active:bg-primary/30 transition-colors group z-10"
            title="Drag to resize sidebar"
          >
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-1 h-20 bg-slate-300 dark:bg-navy-700 rounded-full group-hover:bg-primary group-hover:w-1.5 group-active:bg-primary transition-all shadow-sm" />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 w-full lg:max-w-[600px] lg:border-r border-primary/10 bg-white dark:bg-navy-900 pb-16 lg:pb-0">
          {children}
        </main>

        {/* Right Sidebar - hidden on mobile/tablet, visible on lg+ */}
        {showRightSidebar && (
          <div className="hidden lg:block relative" style={{ width: `${rightWidth}px` }}>
            {/* Right Resize Handle */}
            <div
              onMouseDown={() => setIsResizingRight(true)}
              className="absolute top-0 left-0 w-2 h-full cursor-col-resize hover:bg-primary/20 active:bg-primary/30 transition-colors group z-10"
              title="Drag to resize sidebar"
            >
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-1 h-20 bg-slate-300 dark:bg-navy-700 rounded-full group-hover:bg-primary group-hover:w-1.5 group-active:bg-primary transition-all shadow-sm" />
            </div>
            <RightSidebar />
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation - only visible on mobile */}
      <MobileNav />
    </div>
  );
}
