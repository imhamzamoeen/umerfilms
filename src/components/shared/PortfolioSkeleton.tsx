export default function PortfolioSkeleton() {
  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <div className="h-4 w-24 bg-gray-800 rounded mx-auto mb-4 animate-pulse" />
          <div className="h-12 w-64 bg-gray-800 rounded mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-video bg-gray-800 rounded-lg" />
          ))}
        </div>
      </div>
    </section>
  );
}
