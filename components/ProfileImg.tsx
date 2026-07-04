import Image from "next/image";

interface AvatarProps {
    src: string;
    alt: string;
    size?: number;
}

export default function ProfileImg({ src, alt, size = 160 }: AvatarProps) {
    return (
        <div
            className="overflow-hidden rounded-full ring-4 ring-paper/10"
            style={{ width: size, height: size }}
        >
            <Image
                src={src}
                alt={alt}
                width={size}
                height={size}
                className="h-full w-full object-cover"
                priority
            />
        </div>
    );
}