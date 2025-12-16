interface SectionSkeletonProps {
  height?: string;
}

export default function SectionSkeleton({ height = 'min-h-[400px]' }: SectionSkeletonProps) {
  return (
    <section className={`bg-black ${height} flex items-center justify-center`}>
      <div className="w-12 h-12 border-4 border-gray-700 border-t-pink-500 rounded-full animate-spin" />
    </section>
  );
}
