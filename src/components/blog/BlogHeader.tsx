import Link from 'next/link';
import Image from 'next/image';
import { getPortraitUrl } from '@/lib/settings';

export default async function BlogHeader() {
    const portraitUrl = await getPortraitUrl();

    return (
        <div className="relative isolate overflow-hidden bg-[#0A0A0A] px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <div className="flex justify-center mb-8">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/10 ring-2 ring-[#8B5CF6]/20">
                        <Image
                            src={portraitUrl}
                            alt="Umer Naeem"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    The <span className="text-[#8B5CF6]">Journal</span>
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-400">
                    Thoughts on filmmaking, storytelling, and the art of capturing life&apos;s moving moments.
                </p>
            </div>
        </div>
    );
}
