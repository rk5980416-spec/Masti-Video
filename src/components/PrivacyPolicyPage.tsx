import React, {useState} from 'react';
import {ArrowLeft, Check, Copy, Lock, ShieldCheck, Trash2, UserCheck} from 'lucide-react';
import {SOCIAL_LINKS} from '../config/appConfig';
import {FlamePlayLogo} from './FlamePlayLogo';

interface PrivacyPolicyPageProps {
  onBackHome: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({onBackHome}) => {
  const [copied, setCopied] = useState(false);

  const policyUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/privacy-policy`
      : '/privacy-policy';

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(policyUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  return (
    <section className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Top Action Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-pink-500/60 hover:bg-white/10 sm:text-sm cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-[#FF1E7A]" aria-hidden="true" />
            <span>Back to Home</span>
          </button>

          <button
            type="button"
            onClick={() => {
              void handleCopyUrl();
            }}
            className="inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-2 text-xs font-semibold text-pink-200 transition-colors hover:bg-pink-500/20 sm:text-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                <span>Link Copied for Play Console!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-[#FF1E7A]" aria-hidden="true" />
                <span>Copy Privacy Policy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Main Policy Card */}
        <article className="rounded-3xl border border-white/15 bg-neutral-950/90 p-6 shadow-[0_0_60px_rgba(255,30,122,0.14)] backdrop-blur-xl sm:p-10">
          <header className="border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <FlamePlayLogo size={42} withGlow />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#FF1E7A]">
                  Official Legal Policy
                </p>
                <h1 className="font-display text-2xl font-extrabold text-white sm:text-4xl">
                  Privacy Policy — Masti Video
                </h1>
              </div>
            </div>
            <p className="mt-3 text-xs text-neutral-400 sm:text-sm">
              Last Updated: <span className="text-neutral-200">19 November 2026</span> &middot;
              Applies to the <strong className="text-white">Masti Video</strong> Android application
              and official website.
            </p>
          </header>

          {/* Highlight Summary Pills */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
              <div className="text-xs text-neutral-300">
                <p className="font-semibold text-white">No Data Selling</p>
                <p className="mt-0.5">We never sell your personal data to third-party brokers.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <Lock className="mt-0.5 h-5 w-5 shrink-0 text-[#FF1E7A]" aria-hidden="true" />
              <div className="text-xs text-neutral-300">
                <p className="font-semibold text-white">Permission Control</p>
                <p className="mt-0.5">Camera &amp; mic are used only when you record videos.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <Trash2 className="mt-0.5 h-5 w-5 shrink-0 text-purple-400" aria-hidden="true" />
              <div className="text-xs text-neutral-300">
                <p className="font-semibold text-white">Full Deletion Rights</p>
                <p className="mt-0.5">Delete your videos or account data anytime.</p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="mt-8 space-y-7 text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                1. Introduction
              </h2>
              <p>
                Welcome to <strong className="text-white">Masti Video</strong> (&ldquo;we,&rdquo;
                &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We respect your privacy and are committed
                to protecting the personal information you share when using the Masti Video Android
                app and our official website. This Privacy Policy explains what information we
                collect, how we use it, and your rights regarding your data.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                2. Information We Collect
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-white">Account &amp; Profile Information:</strong> When
                  you create an account, we may collect your username, display name, profile photo,
                  bio, and login credentials (such as email address or phone number).
                </li>
                <li>
                  <strong className="text-white">User-Generated Content:</strong> Short videos,
                  captions, audio selections, likes, comments, bookmarks, and messages you choose
                  to post or share on Masti Video.
                </li>
                <li>
                  <strong className="text-white">Device &amp; Technical Diagnostics:</strong> Basic
                  device information (Android version, device model, app version, crash logs, and
                  performance metrics) used solely to optimize playback speed and fix bugs.
                </li>
                <li>
                  <strong className="text-white">Website Contact Forms:</strong> If you contact us
                  through our website, we receive the name, email address, and message you submit so
                  our support team can reply.
                </li>
              </ul>
            </section>

            <section className="space-y-2.5">
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                3. Android App Permissions
              </h2>
              <p>
                Masti Video only requests Android permissions required for core short-video features:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-white">Camera &amp; Microphone:</strong> Used strictly
                  when you actively record a short video or audio inside the app. We never record
                  video or audio in the background.
                </li>
                <li>
                  <strong className="text-white">Photos / Media / Storage:</strong> Used only when
                  you select videos or profile photos from your device gallery to upload, or save
                  downloaded media to your phone.
                </li>
                <li>
                  <strong className="text-white">Internet &amp; Network Access:</strong> Required to
                  stream videos, load creator profiles, sync likes/comments, and check for app
                  updates.
                </li>
              </ul>
              <p className="text-xs text-neutral-400">
                You can revoke any permission at any time from your Android device Settings.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                4. How We Use Your Information &amp; Creator Monetization
              </h2>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>To operate your account and deliver personalized For You and Following short-video feeds.</li>
                <li>To enable video creation, audio syncing, likes, comments, shares, and creator follows.</li>
                <li>
                  To administer creator monetization features (such as Reel Play Rewards, Gifts,
                  Subscriptions, and Badges) and prevent fraudulent views or payouts.
                </li>
                <li>
                  To detect spam, prevent abuse, enforce community safety guidelines, and respond to
                  support requests.
                </li>
              </ul>
            </section>

            <section className="space-y-2.5">
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                5. User-Generated Content (UGC), Moderation &amp; Safety
              </h2>
              <p>
                Masti Video is a short-video social platform where users upload and share public
                videos, audio clips, and comments. To keep our community safe and compliant with
                Google Play policies:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <strong className="text-white">Prohibited Content:</strong> Nudity, sexually
                  explicit content, hate speech, harassment, violence, dangerous challenges, or
                  copyright-infringing material are strictly prohibited.
                </li>
                <li>
                  <strong className="text-white">Reporting &amp; Blocking:</strong> Users can
                  report objectionable videos or comments and block abusive accounts directly inside
                  the app or by emailing{' '}
                  <a
                    href={`mailto:${SOCIAL_LINKS.supportEmail}`}
                    className="font-medium text-[#FF1E7A] hover:underline"
                  >
                    {SOCIAL_LINKS.supportEmail}
                  </a>
                  .
                </li>
                <li>
                  <strong className="text-white">Enforcement:</strong> Reported content is reviewed
                  promptly, and violating content or accounts are removed or permanently suspended.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                6. Data Sharing &amp; Third-Party Services
              </h2>
              <p>
                We <strong className="text-white">do not sell or rent</strong> your personal
                information to third parties. Public content you upload (such as public reels,
                username, and profile bio) is visible to other Masti Video users according to your
                privacy settings. We may share limited technical or account data with trusted
                service providers strictly required to run the app (such as cloud video storage,
                authentication, crash diagnostics, analytics, or payout processing), or when
                required by law.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                7. Data Security &amp; Retention
              </h2>
              <p>
                All network communication between the Masti Video app/website and our servers is
                encrypted in transit using HTTPS/TLS. We retain your account data only while your
                account is active or as necessary to provide the service, resolve disputes, and
                comply with legal obligations.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                8. Children&apos;s Privacy &amp; Child Safety Standards (13+ Only)
              </h2>
              <p>
                Masti Video is intended strictly for users aged <strong className="text-white">13
                years and older</strong> (or the minimum digital consent age in your country). We do
                not knowingly collect personal data from children under 13.
              </p>
              <p>
                <strong className="text-white">Zero Tolerance for Child Exploitation (CSAE):</strong>{' '}
                Masti Video maintains a strict zero-tolerance policy against Child Sexual Abuse and
                Exploitation (CSAE). Any account uploading, sharing, or soliciting harmful content
                involving minors is immediately terminated and reported to relevant authorities.
                To report child safety concerns immediately, email{' '}
                <a
                  href={`mailto:${SOCIAL_LINKS.supportEmail}?subject=Urgent%20Child%20Safety%20Report`}
                  className="font-medium text-[#FF1E7A] underline underline-offset-2"
                >
                  {SOCIAL_LINKS.supportEmail}
                </a>
                .
              </p>
            </section>

            <section id="account-deletion" className="scroll-mt-24 space-y-2.5">
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                9. Account &amp; Data Deletion Rights
              </h2>
              <div className="flex items-start gap-3 rounded-2xl border border-pink-500/25 bg-pink-500/[0.06] p-4">
                <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#FF1E7A]" aria-hidden="true" />
                <div className="space-y-1.5">
                  <p>
                    You may delete individual videos from your profile inside the Masti Video app at
                    any time. To request permanent deletion of your entire Masti Video account and
                    associated personal data (profile details, uploaded videos, comments, and
                    activity history):
                  </p>
                  <ul className="list-disc space-y-1 pl-4 text-xs text-neutral-300 sm:text-sm">
                    <li>
                      Use the <strong className="text-white">Delete Account</strong> option in the
                      app&apos;s Profile Settings, OR
                    </li>
                    <li>
                      Email{' '}
                      <a
                        href={`mailto:${SOCIAL_LINKS.supportEmail}?subject=Account%20%26%20Data%20Deletion%20Request`}
                        className="font-semibold text-white underline decoration-[#FF1E7A] underline-offset-2"
                      >
                        {SOCIAL_LINKS.supportEmail}
                      </a>{' '}
                      with your registered email/phone and <strong className="text-white">@username</strong>.
                    </li>
                  </ul>
                  <p className="text-xs text-neutral-400">
                    Verified deletion requests are completed within 7–14 business days, except where
                    minimal transaction or fraud-prevention records must be retained by law.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                10. Policy Updates &amp; Contact Information
              </h2>
              <p>
                We may update this Privacy Policy from time to time as we introduce new features or
                comply with regulatory updates. Changes become effective when posted on this page
                with an updated &ldquo;Last Updated&rdquo; date.
              </p>
              <p>
                For privacy questions, data deletion, DMCA/copyright notices, or Play Store
                compliance inquiries, contact our Data Protection &amp; Support Team at:{' '}
                <a
                  href={`mailto:${SOCIAL_LINKS.supportEmail}`}
                  className="font-semibold text-[#FF1E7A] hover:underline"
                >
                  {SOCIAL_LINKS.supportEmail}
                </a>
              </p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
};
