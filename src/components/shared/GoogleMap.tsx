'use client';

interface GoogleMapProps {
  className?: string;
}

export default function GoogleMap({ className = '' }: GoogleMapProps) {
  // Default location - can be configured via env or props
  // Using embed URL without API key for basic functionality
  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25986773928212!3d40.69714941680757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1702569600000!5m2!1sen!2s';

  return (
    <div className={`relative h-full min-h-[400px] w-full ${className}`}>
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{
          border: 0,
          filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)',
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
        className="absolute inset-0"
      />
    </div>
  );
}
