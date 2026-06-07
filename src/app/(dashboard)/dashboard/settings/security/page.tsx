'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Hash,
  Key,
  Link2,
  Lock,
  LogOut,
  Mail,
  Monitor,
  RefreshCw,
  Settings,
  ShieldCheck,
  Smartphone,
  User,
  Users,
  Zap,
} from 'lucide-react'

// ─── Avatar menu ──────────────────────────────────────────────────────────────

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',            icon: User },
  { label: 'Account Settings',    href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

// ─── Shared row component ─────────────────────────────────────────────────────

function SecurityRow({
  icon: Icon, iconColor, iconBg, label, desc, status, statusColor, action, actionHref, actionStyle = 'default',
}: {
  icon: React.ElementType
  iconColor: string
  iconBg: string
  label: string
  desc: string
  status?: string
  statusColor?: string
  action: string
  actionHref: string
  actionStyle?: 'default' | 'gold'
}) {
  const actionClasses =
    actionStyle === 'gold'
      ? 'inline-flex items-center gap-1.5 rounded-[8px] border border-[#d9a461] bg-[#fff8ee] px-4 py-2 text-sm font-black text-[#c97c1e] hover:bg-[#fff2df] transition-colors'
      : 'inline-flex items-center gap-1.5 rounded-[8px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-black text-[#344263] hover:bg-[#faf6f0] transition-colors'

  return (
    <div className="flex items-start gap-3 px-5 py-4 hover:bg-[#faf6f0] transition-colors">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: iconBg }}>
        <Icon className="h-4 w-4" style={{ color: iconColor }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-black text-[#06183a]">{label}</p>
        <p className="mt-0.5 text-xs font-semibold leading-5 text-[#6b7280]">{desc}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2.5">
        {status && (
          <span
            className="hidden rounded-full px-2.5 py-0.5 text-xs font-black sm:inline-block"
            style={{ background: `${statusColor}18`, color: statusColor }}>
            {status}
          </span>
        )}
        <Link href={actionHref} className={actionClasses}>
          {action}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SecurityPage() {
  const [avatarOpen,    setAvatarOpen]    = useState(false)
  const [checkRunning,  setCheckRunning]  = useState(false)
  const [checkDone,     setCheckDone]     = useState(false)

  function runSecurityCheck() {
    setCheckRunning(true)
    setTimeout(() => { setCheckRunning(false); setCheckDone(true) }, 1400)
    setTimeout(() => setCheckDone(false), 4000)
  }

  return (
    <div className="flex min-h-screen bg-[#fffaf2]">

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="min-w-0 flex-1 px-4 py-5 sm:px-6 xl:pr-4">

        {/* Back + header */}
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link href="/dashboard/settings" className="mb-3 flex items-center gap-1.5 text-xs font-bold text-[#6b7280] hover:text-[#c97c1e] transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Settings
            </Link>
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Security</h1>
            <p className="mt-1.5 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
              Manage account protection, active sessions, trusted devices, and recovery options.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>
            <div className="relative">
              <button onClick={() => setAvatarOpen((v) => !v)}
                className="flex items-center gap-2.5 rounded-[12px] border border-[#ead7b9] bg-white px-3 py-2 hover:bg-[#fff8ee] transition-colors">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f2c78c] to-[#8a4b25] font-serif text-sm font-bold text-white">D</div>
                <div className="text-left">
                  <p className="text-sm font-black text-[#06183a]">David</p>
                  <p className="text-[11px] font-semibold text-[#6c37c6]">Premium Member</p>
                </div>
                <ChevronDown className={`h-4 w-4 text-[#6b7280] transition-transform ${avatarOpen ? 'rotate-180' : ''}`} />
              </button>
              {avatarOpen && (
                <div className="absolute right-0 top-12 z-30 w-56 rounded-[14px] border border-[#ead7b9] bg-white py-2 shadow-[0_12px_30px_rgba(48,27,5,0.12)]">
                  <div className="border-b border-[#ead7b9] px-4 pb-3 pt-2">
                    <p className="font-serif text-base font-bold text-[#06183a]">David</p>
                    <p className="text-xs font-semibold text-[#6c37c6]">Premium Member</p>
                  </div>
                  <div className="py-1">
                    {avatarMenuItems.map(({ label, href, icon: Icon }) => (
                      <Link key={label} href={href} onClick={() => setAvatarOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#344263] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-colors">
                        <Icon className="h-4 w-4 shrink-0 text-[#6b7280]" /> {label}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-[#ead7b9] pt-1">
                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#c04060] hover:bg-[#fff0f0] transition-colors">
                      <LogOut className="h-4 w-4 shrink-0" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {avatarOpen && <div className="fixed inset-0 z-20" onClick={() => setAvatarOpen(false)} />}

        {/* Toast */}
        {checkDone && (
          <div className="mb-4 flex items-center gap-2 rounded-[10px] border border-[#b6e8d9] bg-[#f0faf6] px-4 py-2.5 text-sm font-black text-[#0f8a77]">
            <BadgeCheck className="h-4 w-4" /> Security check complete. Your account looks protected.
          </div>
        )}

        {/* ── Security at a glance ──────────────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
          <div className="flex flex-wrap items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e0f5ee]">
              <ShieldCheck className="h-6 w-6 text-[#0f8a77]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-serif text-lg font-bold text-[#0a5c4e]">Security at a glance</p>
              <p className="mt-0.5 text-sm font-semibold text-[#1a6b5a]">Your account is protected and your data is encrypted.</p>
              <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">
                Last security check: <span className="font-black text-[#0a5c4e]">Today at 9:41 AM</span>
              </p>
            </div>
            <button onClick={runSecurityCheck} disabled={checkRunning}
              className="inline-flex items-center gap-2 rounded-[10px] border border-[#6c37c6] bg-white px-4 py-2.5 text-sm font-black text-[#6c37c6] shadow-[0_4px_12px_rgba(108,55,198,0.1)] hover:bg-[#f5f0ff] transition-colors disabled:opacity-60">
              <ShieldCheck className={`h-4 w-4 ${checkRunning ? 'animate-spin' : ''}`} />
              {checkRunning ? 'Checking…' : 'Run security check'}
            </button>
          </div>
        </section>

        {/* ── Section 1: Account Protection ────────────────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6c37c6] text-xs font-black text-white">1</div>
            <div>
              <h2 className="text-base font-black text-[#06183a]">Account Protection</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Keep your account safe with strong, modern protections.</p>
            </div>
          </div>
          <div className="divide-y divide-[#ead7b9]">
            <SecurityRow
              icon={Lock}     iconColor="#6c37c6" iconBg="#f5f0ff"
              label="Password"
              desc="Your password was last changed on May 10, 2024."
              status="Strong" statusColor="#0f8a77"
              action="Change password" actionHref="/dashboard/settings/security/password"
            />
            <SecurityRow
              icon={Key}      iconColor="#176dff" iconBg="#eff4ff"
              label="Two-factor authentication (2FA)"
              desc="Add an extra layer of security to your account."
              status="Enabled" statusColor="#0f8a77"
              action="Manage 2FA" actionHref="/dashboard/settings/security/2fa"
            />
            <SecurityRow
              icon={Monitor}  iconColor="#6c37c6" iconBg="#f5f0ff"
              label="Sign-in activity"
              desc="Review recent sign-ins and active sessions."
              action="View activity" actionHref="/dashboard/settings/security/activity"
            />
            <SecurityRow
              icon={Smartphone} iconColor="#344263" iconBg="#f3f4f6"
              label="Trusted devices"
              desc="Manage devices that can access your account."
              action="Manage devices" actionHref="/dashboard/settings/security/devices"
            />
          </div>
        </section>

        {/* ── Section 2: Encryption & Access Protection ─────────────────── */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6c37c6] text-xs font-black text-white">2</div>
            <div>
              <h2 className="text-base font-black text-[#06183a]">Encryption &amp; Access Protection</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Your data is encrypted in transit and at rest.</p>
            </div>
          </div>
          <div className="divide-y divide-[#ead7b9]">
            <SecurityRow
              icon={ShieldCheck} iconColor="#0f8a77" iconBg="#f0faf6"
              label="Encryption status"
              desc="All your data is encrypted."
              status="Active" statusColor="#0f8a77"
              action="Learn more" actionHref="/how-it-works/security"
            />
            <SecurityRow
              icon={Users}    iconColor="#176dff" iconBg="#eff4ff"
              label="Active sessions"
              desc="You're currently signed in on 2 devices."
              action="Manage sessions" actionHref="/dashboard/settings/security/sessions"
            />
            <SecurityRow
              icon={Hash}     iconColor="#6c37c6" iconBg="#f5f0ff"
              label="Recovery codes"
              desc="Use recovery codes if you lose access to your account."
              action="View recovery codes" actionHref="/dashboard/settings/security/recovery-codes"
            />
            <SecurityRow
              icon={Mail}     iconColor="#c97c1e" iconBg="#fff8ee"
              label="Backup email"
              desc="Keep a backup email to help recover your account."
              action="Manage backup email" actionHref="/dashboard/settings/security/backup-email"
            />
          </div>
        </section>

        {/* ── Section 3: Recovery & Account Safety ─────────────────────── */}
        <section className="mb-4 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6c37c6] text-xs font-black text-white">3</div>
            <div>
              <h2 className="text-base font-black text-[#06183a]">Recovery &amp; Account Safety</h2>
              <p className="text-xs font-semibold text-[#6b7280]">Tools to help you recover your account and stay protected.</p>
            </div>
          </div>
          <div className="divide-y divide-[#ead7b9]">
            <SecurityRow
              icon={Smartphone}  iconColor="#6c37c6" iconBg="#f5f0ff"
              label="Device approvals"
              desc="Review and manage new device approvals."
              action="View approvals" actionHref="/dashboard/settings/security/device-approvals"
            />
            <SecurityRow
              icon={AlertTriangle} iconColor="#c97c1e" iconBg="#fff8ee"
              label="Suspicious sign-in alerts"
              desc="Get notified about unusual sign-in activity."
              action="Manage alerts" actionHref="/dashboard/settings/security/alerts"
            />
            <SecurityRow
              icon={RefreshCw}   iconColor="#176dff" iconBg="#eff4ff"
              label="Account recovery"
              desc="Options if you can't access your account."
              action="Manage recovery" actionHref="/dashboard/settings/security/recovery"
            />
            <SecurityRow
              icon={Settings}    iconColor="#344263" iconBg="#f3f4f6"
              label="Recovery methods"
              desc="Manage your recovery email and methods."
              action="Manage methods" actionHref="/dashboard/settings/security/recovery-methods"
            />
            {/* Data deletion — routes to Privacy & Data, not a destructive action */}
            <div className="flex items-start gap-3 px-5 py-4 hover:bg-[#faf6f0] transition-colors">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff8ee]">
                <ShieldCheck className="h-4 w-4 text-[#c97c1e]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-[#06183a]">Data deletion</p>
                <p className="mt-0.5 text-xs font-semibold leading-5 text-[#6b7280]">
                  Manage export, retention, and deletion under Privacy &amp; Data.
                </p>
              </div>
              <Link href="/dashboard/settings/privacy-data"
                className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#d9a461] bg-[#fff8ee] px-4 py-2 text-sm font-black text-[#c97c1e] hover:bg-[#fff2df] transition-colors whitespace-nowrap">
                Go to Privacy &amp; Data <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* ── Right rail ──────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* About Security */}
          <div className="rounded-[14px] border border-[#e0d4f8] bg-[#f8f5ff] p-4 shadow-[0_4px_12px_rgba(108,55,198,0.06)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">About Security</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Security protects access. Privacy &amp; Data controls your information.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              Use this page to manage sign-ins, devices, passwords, and recovery.
            </p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              Use{' '}
              <Link href="/dashboard/settings/privacy-data" className="font-black text-[#6c37c6] hover:underline">Privacy &amp; Data</Link>
              {' '}to export, review, or delete data.
            </p>
            <Link href="/how-it-works/security" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#6c37c6] hover:underline">
              Learn more about security <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Your privacy matters */}
          <div className="rounded-[14px] border border-[#b6e8d9] bg-[#f2faf6] p-4 shadow-[0_4px_12px_rgba(15,138,119,0.06)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0f8a77]" />
              <h2 className="text-sm font-black text-[#06183a]">Your privacy matters.</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">Your Self-Map is personal.</p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">We never sell your data.</p>
            <p className="mt-1.5 text-xs font-semibold leading-5 text-[#344263]">
              You choose what to share, and you can change it anytime.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-[#6c37c6]" />
              <h2 className="text-sm font-black text-[#06183a]">Quick actions</h2>
            </div>
            <div className="mt-3 space-y-1">
              {[
                { icon: ShieldCheck, color: '#0f8a77', label: 'Run security check',       sub: 'Scan your account for security issues.',    href: null,                                                   action: runSecurityCheck },
                { icon: Users,       color: '#176dff', label: 'Manage active sessions',   sub: 'Sign out of any device.',                  href: '/dashboard/settings/security/sessions',                action: null },
                { icon: Hash,        color: '#6c37c6', label: 'View recovery codes',      sub: 'Access your account recovery codes.',       href: '/dashboard/settings/security/recovery-codes',          action: null },
                { icon: Mail,        color: '#c97c1e', label: 'Update email',             sub: 'Update the email on your account.',         href: '/dashboard/settings/security/backup-email',            action: null },
              ].map(({ icon: Icon, color, label, sub, href, action }) => {
                const inner = (
                  <>
                    <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />
                    <div className="flex-1">
                      <p className="text-xs font-black text-[#06183a]">{label}</p>
                      <p className="text-[11px] font-semibold text-[#6b7280]">{sub}</p>
                    </div>
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d3b98f]" />
                  </>
                )
                return href ? (
                  <Link key={label} href={href} className="flex items-start gap-3 rounded-[8px] px-2 py-2.5 hover:bg-[#fff8ee] transition-colors">{inner}</Link>
                ) : (
                  <button key={label} onClick={action ?? undefined} className="flex w-full items-start gap-3 rounded-[8px] px-2 py-2.5 text-left hover:bg-[#fff8ee] transition-colors">{inner}</button>
                )
              })}
            </div>
          </div>

          {/* Need help? */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#c97c1e]" />
              <h2 className="text-sm font-black text-[#06183a]">Need help?</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Our support team is here if you have any questions.
            </p>
            <Link href="/dashboard/settings/help-support" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              Go to Help Center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>
      </aside>
    </div>
  )
}
