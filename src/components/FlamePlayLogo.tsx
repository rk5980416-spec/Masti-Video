import React, {useState} from 'react';

interface FlamePlayLogoProps {
  className?: string;
  size?: number;
  withGlow?: boolean;
}

/**
 * Official Masti Video Flame Play Logo
 * Uses the user's official transparent Flame Play emblem everywhere
 * (Header, Hero, Footer, and Download Modal).
 */
export const FlamePlayLogo: React.FC<FlamePlayLogoProps> = ({
  className = '',
  size = 44,
  withGlow = true,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M34.5 5.5C35.2 13.8 29.8 18.4 26.8 22.8C25.2 25.1 24.4 27.6 24.4 30.1C24.4 30.1 21.8 27.5 22.1 22.4C15.1 27.5 11.5 34.9 12.2 42.3C13.1 51.6 21.4 58.5 32 58.5C43.1 58.5 51.8 50.6 51.8 39.8C51.8 31.2 46.5 24.7 42.2 20.1C38.5 16.1 35.4 12.1 34.5 5.5Z"
          fill="#FF3B00"
        />
        <circle cx="33" cy="40" r="10" fill="#FFFFFF" />
        <path d="M30 35L40 40L30 45V35Z" fill="#FF2E00" />
      </svg>
    );
  }

  return (
    <img
      src="/assets/masti-logo.png"
      alt="Masti Video Official Flame Play Logo"
      width={size}
      height={size}
      referrerPolicy="no-referrer"
      onError={() => setImgFailed(true)}
      className={`inline-block shrink-0 object-contain select-none ${className}`}
      style={{
        width: size,
        height: size,
        filter: withGlow
          ? 'drop-shadow(0 0 14px rgba(255, 60, 0, 0.55)) drop-shadow(0 0 24px rgba(255, 30, 122, 0.45))'
          : undefined,
      }}
    />
  );
};

export const AndroidIcon: React.FC<{className?: string}> = ({className = 'w-5 h-5'}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.523 15.3414C17.022 15.3414 16.615 14.9344 16.615 14.4334C16.615 13.9324 17.022 13.5254 17.523 13.5254C18.024 13.5254 18.431 13.9324 18.431 14.4334C18.431 14.9344 18.024 15.3414 17.523 15.3414ZM6.477 15.3414C5.976 15.3414 5.569 14.9344 5.569 14.4334C5.569 13.9324 5.976 13.5254 6.477 13.5254C6.978 13.5254 7.385 13.9324 7.385 14.4334C7.385 14.9344 6.978 15.3414 6.477 15.3414ZM17.856 10.6594L19.67 7.5174C19.776 7.3344 19.713 7.1004 19.53 6.9944C19.347 6.8884 19.113 6.9514 19.007 7.1344L17.169 10.3174C15.637 9.6184 13.884 9.2194 12 9.2194C10.116 9.2194 8.363 9.6184 6.831 10.3174L4.993 7.1344C4.887 6.9514 4.653 6.8884 4.47 6.9944C4.287 7.1004 4.224 7.3344 4.33 7.5174L6.144 10.6594C3.09 12.3134 1.015 15.3894 0.8 19.0004H23.2C22.985 15.3894 20.91 12.3134 17.856 10.6594Z" />
  </svg>
);
