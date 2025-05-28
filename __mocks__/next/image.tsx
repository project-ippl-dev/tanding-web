import React from 'react';

// Mocking next/image
// This basic mock renders an <img> tag and passes through common props.
// It simplifies the <Image> component to a standard <img> for easier testing,
// avoiding the complexities of Next.js image optimization during unit tests.
const ImageMock = ({
  src,
  alt,
  width,
  height,
  fill,
  loader,
  quality,
  priority,
  loading,
  placeholder,
  blurDataURL,
  unoptimized,
  overrideSrc, // Deprecated
  onError,
  onLoad,
  sizes,
  style,
  ...rest
}: React.ComponentProps<"img"> & {
  fill?: boolean;
  loader?: ({ src, width, quality }: { src: string; width: number; quality?: number }) => string;
  quality?: number | string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty' | `data:image/${string}`;
  blurDataURL?: string;
  unoptimized?: boolean;
  overrideSrc?: string; // Deprecated
  sizes?: string;
}) => {
  // If fill is true, width and height might not be provided directly.
  // This mock doesn't attempt to replicate the complex layout behavior of `fill`.
  // It just renders a basic img tag.
  const imageProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    src: typeof src === 'string' ? src : (src as any)?.src ?? (src as any)?.default?.src ?? '',
    alt: alt || '',
    width: fill ? undefined : (width as number),
    height: fill ? undefined : (height as number),
    style: style,
    ...rest,
  };

  if (loading) {
    imageProps.loading = loading;
  }
  
  return <img {...imageProps} />;
};

export default ImageMock;
