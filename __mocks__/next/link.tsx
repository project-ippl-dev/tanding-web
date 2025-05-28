import React from 'react';

// Mocking next/link
// This basic mock renders an <a> tag and passes through props like href and children.
// It also includes a jest.fn() for the onClick prop if you need to spy on it.
const LinkMock = ({
  children,
  href,
  replace,
  scroll,
  prefetch,
  locale,
  legacyBehavior,
  passHref,
  onClick,
  ...rest
}: React.ComponentProps<"a"> & {
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean | 'intent';
  locale?: string | false;
  legacyBehavior?: boolean;
  passHref?: boolean;
}) => {
  // If legacyBehavior is true, children should be an <a> tag or a component that eventually renders one.
  // For simplicity, this mock will always render an <a> tag itself.
  // You might need to adjust this if your tests rely on specific legacyBehavior functionality.

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    // Prevent default navigation if it's a test environment and you're not explicitly testing navigation
    if (process.env.NODE_ENV === 'test' && !e.defaultPrevented) {
      // e.preventDefault(); // Uncomment if you want to prevent default for all mocked links
    }
  };

  return (
    <a href={href?.toString()} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export default LinkMock;
