import { ContactForm } from '@/components/contact/ContactForm';
import GoogleMap from '@/components/shared/GoogleMap';

export default function ContactSection() {
  return (
    <section className="contact-section bg-black py-24" id="contact">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="section-label mb-4 text-sm uppercase tracking-widest text-gray-400">
            Get In Touch
          </p>
          <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Let&apos;s Work Together
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Ready to bring your vision to life? Fill out the form below and
            I&apos;ll get back to you within 24-48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl bg-[#1E1E1E] p-8">
            <h3 className="mb-6 text-2xl font-bold text-white">
              Send a Message
            </h3>
            <ContactForm />
          </div>

          {/* Google Map */}
          <div className="overflow-hidden rounded-2xl bg-[#1E1E1E]">
            <GoogleMap />
          </div>
        </div>
      </div>
    </section>
  );
}
