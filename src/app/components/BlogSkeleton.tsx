export default function BlogSkeleton() {
  return (
    <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden h-full flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full h-56 bg-[var(--border)] opacity-50"></div>
      
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags Skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 bg-[var(--border)] rounded-full opacity-50"></div>
          <div className="h-6 w-12 bg-[var(--border)] rounded-full opacity-50"></div>
        </div>
        
        {/* Title Skeleton */}
        <div className="h-6 w-full bg-[var(--border)] rounded-md opacity-50 mb-3"></div>
        <div className="h-6 w-3/4 bg-[var(--border)] rounded-md opacity-50 mb-6"></div>
        
        {/* Description Skeleton */}
        <div className="h-4 w-full bg-[var(--border)] rounded-md opacity-30 mb-2"></div>
        <div className="h-4 w-full bg-[var(--border)] rounded-md opacity-30 mb-2"></div>
        <div className="h-4 w-2/3 bg-[var(--border)] rounded-md opacity-30 mb-6 flex-grow"></div>
        
        {/* Meta Skeleton */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--border)] opacity-50"></div>
            <div className="h-4 w-20 bg-[var(--border)] rounded-md opacity-50"></div>
          </div>
          <div className="h-4 w-16 bg-[var(--border)] rounded-md opacity-50"></div>
        </div>
      </div>
    </div>
  );
}
