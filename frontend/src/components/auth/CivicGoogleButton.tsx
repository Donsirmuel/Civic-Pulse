import { useEffect, useRef } from 'react';
import { Icon } from '../common';

interface GoogleCredentialResponse {
  credential?: string;
}

interface GooglePromptMomentNotification {
  isNotDisplayed?: () => boolean;
  isSkippedMoment?: () => boolean;
  isDismissedMoment?: () => boolean;
}

interface GoogleIdentityApi {
  initialize: (config: { client_id: string; callback: (response: GoogleCredentialResponse) => void }) => void;
  prompt: (listener?: (notification: GooglePromptMomentNotification) => void) => void;
}

declare global {
  interface Window {
    google?: {
      accounts?: {
        id?: GoogleIdentityApi;
      };
    };
  }
}

interface CivicGoogleButtonProps {
  onCredential: (credential: string) => Promise<void> | void;
  onError: (message: string) => void;
  label?: string;
  variant?: 'surface' | 'elevated';
}

export default function CivicGoogleButton({
  onCredential,
  onError,
  label = 'Continue with Google',
  variant = 'surface',
}: CivicGoogleButtonProps) {
  const onCredentialRef = useRef(onCredential);
  const onErrorRef = useRef(onError);
  const initializedRef = useRef(false);

  useEffect(() => {
    onCredentialRef.current = onCredential;
  }, [onCredential]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const initializeGoogle = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const googleId = window.google?.accounts?.id;

    if (!clientId) {
      onErrorRef.current('Google sign-in is not configured yet.');
      return false;
    }

    if (!googleId) {
      onErrorRef.current('Google sign-in is not ready yet. Please try again.');
      return false;
    }

    if (!initializedRef.current) {
      googleId.initialize({
        client_id: clientId,
        callback: async (response: GoogleCredentialResponse) => {
          if (!response.credential) {
            onErrorRef.current('Google sign-in did not return a valid credential.');
            return;
          }

          await onCredentialRef.current(response.credential);
        },
      });
      initializedRef.current = true;
    }

    return true;
  };

  const handleGoogleClick = () => {
    if (!initializeGoogle()) return;

    const googleId = window.google?.accounts?.id;
    if (!googleId) return;

    googleId.prompt((notification) => {
      if (notification.isNotDisplayed?.() || notification.isSkippedMoment?.() || notification.isDismissedMoment?.()) {
        onErrorRef.current('Google sign-in could not be opened. Please try again.');
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-md px-5 text-sm font-semibold transition hover:brightness-[1.02]"
      style={
        variant === 'elevated'
          ? {
              background: 'linear-gradient(180deg, var(--civic-surface) 0%, var(--civic-surface-soft) 100%)',
              color: 'var(--civic-text)',
              boxShadow: '0 10px 22px rgba(22,33,51,0.08), inset 0 0 0 1px var(--civic-border)',
            }
          : {
              background: 'var(--civic-surface)',
              color: 'var(--civic-text)',
              boxShadow: 'inset 0 0 0 1px var(--civic-border)',
            }
      }
    >
      <span
        className="inline-flex size-7 items-center justify-center rounded-full"
        style={{ background: 'var(--civic-surface-strong)', boxShadow: 'inset 0 0 0 1px var(--civic-border)' }}
        aria-hidden="true"
      >
        <span className="text-[13px] font-black" style={{ color: 'var(--civic-primary)' }}>
          G
        </span>
      </span>
      <span>{label}</span>
      <Icon name="arrow_forward" className="text-base" />
    </button>
  );
}
