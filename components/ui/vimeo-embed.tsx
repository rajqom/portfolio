'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface VimeoEmbedProps {
  videoId: string;
  className?: string;
  title?: string;
  onPlay?: () => void;
}

interface VimeoPlayer {
  on: (event: string, callback: () => void) => void;
  off: (event: string) => void;
}

interface VimeoPlayerConstructor {
  new (element: HTMLIFrameElement): VimeoPlayer;
}

interface VimeoWindow extends Window {
  Vimeo?: {
    Player: VimeoPlayerConstructor;
  };
}

export default function VimeoEmbed({ 
  videoId, 
  className = '',
  title = 'Video',
  onPlay
}: VimeoEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);

  useEffect(() => {
    if (!iframeRef.current || !onPlay) return;

    const setupPlayer = () => {
      // Check if Vimeo Player API is available
      const vimeoWindow = window as unknown as VimeoWindow;
      if (typeof window !== 'undefined' && vimeoWindow.Vimeo?.Player) {
        try {
          const player = new vimeoWindow.Vimeo.Player(iframeRef.current!);
          playerRef.current = player;
          
          player.on('play', () => {
            onPlay();
          });
        } catch (error) {
          console.error('Error setting up Vimeo player:', error);
        }
      }
    };

    const vimeoWindow = window as unknown as VimeoWindow;

    // Try to setup immediately if script is already loaded
    if (vimeoWindow.Vimeo?.Player) {
      setupPlayer();
    } else {
      // Wait for script to load
      const checkVimeo = setInterval(() => {
        if (vimeoWindow.Vimeo?.Player) {
          setupPlayer();
          clearInterval(checkVimeo);
        }
      }, 100);

      // Cleanup after 5 seconds if script doesn't load
      setTimeout(() => clearInterval(checkVimeo), 5000);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.off('play');
      }
    };
  }, [onPlay]);

  const embedUrl = `https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`;

  return (
    <>
      <Script
        src="https://player.vimeo.com/api/player.js"
        strategy="lazyOnload"
        onLoad={() => {
          // Script loaded, player setup will happen in useEffect
        }}
      />
      <div 
        style={{ padding: '56.6% 0 0 0', position: 'relative' }}
        className={className}
      >
        <iframe
          ref={iframeRef}
          src={embedUrl}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          title={title}
        />
      </div>
    </>
  );
}
