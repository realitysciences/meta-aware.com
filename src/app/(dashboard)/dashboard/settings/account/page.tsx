'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  CircleHelp,
  Copy,
  CreditCard,
  Link2,
  Lock,
  LogOut,
  PenLine,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Camera,
  ChevronDown,
} from 'lucide-react'

const NOTE_MAX = 160

const avatarMenuItems = [
  { label: 'View Profile',        href: '/dashboard/settings/account',            icon: User },
  { label: 'Account Settings',    href: '/dashboard/settings/account',            icon: Settings },
  { label: 'Privacy Center',      href: '/dashboard/settings/privacy-data',       icon: ShieldCheck },
  { label: 'Billing / Plan',      href: '/dashboard/settings/billing',            icon: CreditCard },
  { label: 'Connected Accounts',  href: '/dashboard/settings/connected-accounts', icon: Link2 },
]

function SettingsRow({ label, value, helper, chevron = true }: { label: string; value: string; helper?: string; chevron?: boolean }) {
  return (
    <button className="flex w-full items-center justify-between gap-4 rounded-[8px] px-2 py-3 text-left hover:bg-[#faf6f0] transition-colors">
      <div className="min-w-0">
        <p className="text-sm font-black text-[#06183a]">{label}</p>
        {helper && <p className="mt-0.5 text-[11px] font-semibold text-[#a0a8b8]">{helper}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-[#344263]">
        <span>{value}</span>
        {chevron && <ChevronRight className="h-4 w-4 text-[#d3b98f]" />}
      </div>
    </button>
  )
}

export default function AccountProfilePage() {
  const [editMode, setEditMode]       = useState(false)
  const [avatarOpen, setAvatarOpen]   = useState(false)
  const [showPlan, setShowPlan]       = useState(true)
  const [preferredName, setPreferredName] = useState('David')
  const [displayName, setDisplayName]     = useState('David')
  const [note, setNote]               = useState('Explorer. Builder. Lifelong learner.')
  const [copied, setCopied]           = useState(false)
  const [saved, setSaved]             = useState(false)

  function handleSave() {
    setEditMode(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleCancel() {
    setEditMode(false)
    setPreferredName('David')
    setDisplayName('David')
    setNote('Explorer. Builder. Lifelong learner.')
  }

  function copyAccountId() {
    navigator.clipboard?.writeText('MA-7F3K-9D2B').catch(() => null)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
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
            <h1 className="font-serif text-4xl font-bold text-[#06183a]">Account &amp; Profile</h1>
            <p className="mt-1.5 max-w-xl text-sm font-semibold leading-6 text-[#344263]">
              Manage your personal information, how Meta-Aware refers to you, and the basics of your account.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead7b9] bg-white text-[#344263] hover:bg-[#fff2df] transition-colors" aria-label="Help">
              <CircleHelp className="h-5 w-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setAvatarOpen((v) => !v)}
                className="flex items-center gap-2.5 rounded-[12px] border border-[#ead7b9] bg-white px-3 py-2 hover:bg-[#fff8ee] transition-colors"
              >
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
                      <Link key={label} href={href} onClick={() => setAvatarOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[#344263] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-colors">
                        <Icon className="h-4 w-4 shrink-0 text-[#6b7280]" />
                        {label}
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
        {saved && (
          <div className="mb-4 flex items-center gap-2 rounded-[10px] border border-[#b6e8d9] bg-[#f0faf6] px-4 py-2.5 text-sm font-black text-[#0f8a77]">
            <BadgeCheck className="h-4 w-4" /> Profile updated.
          </div>
        )}

        {/* Card 1: Identity */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-start justify-between border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <div>
              <h2 className="text-base font-black text-[#06183a]">Your Identity in Meta-Aware</h2>
              <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">This is how you show up in your private map.</p>
            </div>
            <button
              onClick={() => setEditMode((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#ead7b9] bg-white px-3 py-2 text-xs font-black text-[#344263] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-colors"
            >
              <PenLine className="h-3.5 w-3.5" /> {editMode ? 'Cancel Edit' : 'Edit'}
            </button>
          </div>
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#ead7b9] bg-gradient-to-br from-[#f2c78c] to-[#8a4b25]">
                <span className="font-serif text-4xl font-bold text-white">D</span>
              </div>
              <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#c97c1e] text-white shadow-md hover:bg-[#b06a14] transition-colors" aria-label="Change photo">
                <Camera className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Fields */}
            <div className="flex-1 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-black text-[#344263]">Preferred Name</label>
                  {editMode ? (
                    <input
                      value={preferredName}
                      onChange={(e) => setPreferredName(e.target.value)}
                      className="w-full rounded-[8px] border border-[#d9a461] bg-white px-3 py-2 text-sm font-semibold text-[#06183a] outline-none focus:border-[#c97c1e]"
                    />
                  ) : (
                    <div className="rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-3 py-2 text-sm font-semibold text-[#06183a]">{preferredName}</div>
                  )}
                  <p className="mt-1 text-[11px] font-semibold text-[#a0a8b8]">What Meta-Aware should call you.</p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-black text-[#344263]">Display Name</label>
                  {editMode ? (
                    <input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full rounded-[8px] border border-[#d9a461] bg-white px-3 py-2 text-sm font-semibold text-[#06183a] outline-none focus:border-[#c97c1e]"
                    />
                  ) : (
                    <div className="rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-3 py-2 text-sm font-semibold text-[#06183a]">{displayName}</div>
                  )}
                  <p className="mt-1 text-[11px] font-semibold text-[#a0a8b8]">Shown in the app where your name appears.</p>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-black text-[#344263]">Personal Note <span className="font-semibold text-[#a0a8b8]">(private)</span></label>
                {editMode ? (
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX))}
                    rows={3}
                    className="w-full resize-none rounded-[8px] border border-[#d9a461] bg-white px-3 py-2 text-sm font-semibold text-[#06183a] outline-none focus:border-[#c97c1e]"
                  />
                ) : (
                  <div className="min-h-[72px] rounded-[8px] border border-[#ead7b9] bg-[#faf6f0] px-3 py-2 text-sm font-semibold text-[#06183a]">{note}</div>
                )}
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-[#a0a8b8]">Private to you. Used only to help Meta-Aware personalize your experience.</p>
                  {editMode && <span className="text-[11px] font-semibold text-[#a0a8b8]">{note.length} / {NOTE_MAX}</span>}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Card 2: Display Preferences */}
        <section className="mb-3 overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
            <h2 className="text-base font-black text-[#06183a]">Display Preferences</h2>
            <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Control how your name and profile appear inside Meta-Aware.</p>
          </div>
          <div className="px-5 py-2">
            {/* Show Plan Label */}
            <div className="flex items-center justify-between border-b border-[#ead7b9] py-3.5">
              <div>
                <p className="text-sm font-black text-[#06183a]">Show Plan Label</p>
                <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Show your plan (Premium Member) next to your name.</p>
              </div>
              <button
                onClick={() => setShowPlan((v) => !v)}
                aria-checked={showPlan}
                role="switch"
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${showPlan ? 'bg-[#06183a]' : 'bg-[#d3b98f]'}`}
              >
                <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${showPlan ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            {/* Profile Visibility */}
            <button className="flex w-full items-center justify-between gap-4 py-3.5 text-left hover:bg-[#faf6f0] rounded-[8px] px-1 -mx-1 transition-colors">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 shrink-0 text-[#0f8a77]" />
                <div>
                  <p className="text-sm font-black text-[#06183a]">Profile Visibility</p>
                  <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Only you can see your profile unless you choose otherwise.</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-sm font-black text-[#0f8a77]">Private Only (Default)</span>
                <ChevronRight className="h-4 w-4 text-[#d3b98f]" />
              </div>
            </button>
          </div>
        </section>

        {/* Cards 3 & 4: Regional + Account Overview */}
        <div className="mb-3 grid gap-3 sm:grid-cols-2">
          {/* Regional Preferences */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eff4ff]">
                <span className="text-lg">🌐</span>
              </div>
              <div>
                <h2 className="text-sm font-black text-[#06183a]">Regional Preferences</h2>
                <p className="text-[11px] font-semibold text-[#6b7280]">Set your language, timezone, and regional format.</p>
              </div>
            </div>
            <div className="divide-y divide-[#ead7b9] px-4 py-1">
              {[
                { label: 'Language',       value: 'English' },
                { label: 'Timezone',       value: '(GMT-7) Pacific Time (Los Angeles)' },
                { label: 'Date Format',    value: 'May 16, 2025' },
                { label: 'Time Format',    value: '9:41 AM' },
                { label: 'First Day of Week', value: 'Sunday' },
              ].map(({ label, value }) => (
                <SettingsRow key={label} label={label} value={value} />
              ))}
            </div>
          </section>

          {/* Account Overview */}
          <section className="overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-3 border-b border-[#ead7b9] bg-[#faf6f0] px-5 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff8ee]">
                <User className="h-4 w-4 text-[#c97c1e]" />
              </div>
              <div>
                <h2 className="text-sm font-black text-[#06183a]">Account Overview</h2>
                <p className="text-[11px] font-semibold text-[#6b7280]">Key details about your account.</p>
              </div>
            </div>
            <div className="divide-y divide-[#ead7b9] px-5 py-1">
              {/* Email */}
              <div className="flex items-center justify-between py-3">
                <p className="text-sm font-black text-[#06183a]">Email</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#344263]">
                  <span>david@example.com</span>
                  <span className="flex items-center gap-1 text-[11px] font-black text-[#0f8a77]">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                </div>
              </div>
              {/* Member Since */}
              <div className="flex items-center justify-between py-3">
                <p className="text-sm font-black text-[#06183a]">Member Since</p>
                <p className="text-sm font-semibold text-[#344263]">Apr 12, 2024</p>
              </div>
              {/* Plan */}
              <div className="flex items-center justify-between py-3">
                <p className="text-sm font-black text-[#06183a]">Plan</p>
                <div className="flex items-center gap-1.5 text-sm font-black text-[#5b3609]">
                  Premium Member <Star className="h-3.5 w-3.5 fill-[#f0a638] text-[#f0a638]" />
                </div>
              </div>
              {/* Account ID */}
              <div className="flex items-center justify-between py-3">
                <p className="text-sm font-black text-[#06183a]">Account ID</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#a0a8b8]">
                  <span className="font-mono">MA-7F3K-9D2B</span>
                  <button onClick={copyAccountId} className="text-[#c97c1e] hover:opacity-70 transition-opacity" aria-label="Copy account ID">
                    {copied ? <BadgeCheck className="h-4 w-4 text-[#0f8a77]" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-[#ead7b9] px-4 py-2">
              <button className="flex w-full items-center justify-between rounded-[8px] px-2 py-2.5 text-sm font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
                Advanced Account Details
                <ChevronRight className="h-4 w-4 text-[#d3b98f]" />
              </button>
            </div>
          </section>
        </div>

        {/* Card 5: Sign-in & Security */}
        <section className="mb-4 flex items-center justify-between overflow-hidden rounded-[14px] border border-[#ead7b9] bg-white/76 px-5 py-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eff4ff]">
              <Lock className="h-5 w-5 text-[#176dff]" />
            </div>
            <div>
              <h2 className="text-sm font-black text-[#06183a]">Sign-in &amp; Security</h2>
              <p className="mt-0.5 text-xs font-semibold text-[#6b7280]">Manage how you sign in and keep your account secure.</p>
            </div>
          </div>
          <Link href="/dashboard/settings/security" className="inline-flex items-center gap-2 rounded-[8px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-black text-[#344263] hover:bg-[#fff8ee] hover:text-[#c97c1e] transition-colors">
            Manage Security <ChevronRight className="h-4 w-4" />
          </Link>
        </section>

        {/* Save / Cancel bar */}
        {editMode && (
          <div className="sticky bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-[#d9c49a] bg-[#fdf6e8] px-5 py-4 shadow-[0_8px_24px_rgba(48,27,5,0.1)]">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-[#6b7280]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0f8a77]" />
              Your changes are private and encrypted. We&apos;ll never share your information.
            </p>
            <div className="flex gap-2">
              <button onClick={handleCancel} className="rounded-[8px] border border-[#ead7b9] bg-white px-4 py-2 text-sm font-black text-[#344263] hover:bg-[#faf6f0] transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} className="rounded-[8px] bg-[#c97c1e] px-5 py-2 text-sm font-black text-white shadow-[0_4px_12px_rgba(201,124,30,0.3)] hover:bg-[#b06a14] transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Right rail ──────────────────────────────────────────────────────── */}
      <aside className="hidden w-72 shrink-0 xl:block xl:w-[280px]">
        <div className="sticky top-0 h-screen space-y-3 overflow-y-auto px-4 py-5">

          {/* Profile Tips */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#c97c1e]" />
              <h2 className="text-sm font-black text-[#06183a]">Profile Tips</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Your Preferred Name is used by Reality Scientist AI in conversations and insights.
            </p>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              This profile is private unless you choose to share it.
            </p>
            <Link href="/how-it-works/profile" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#c97c1e] hover:underline">
              Learn more about your profile <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Privacy First */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#0f8a77]" />
              <h2 className="text-sm font-black text-[#06183a]">Privacy First</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Your information is end-to-end encrypted and never shared.
            </p>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              You&apos;re in control of what stays private.
            </p>
            <Link href="/dashboard/settings/privacy-data" className="mt-3 flex items-center gap-1.5 text-xs font-black text-[#0f8a77] hover:underline">
              Visit Privacy Center <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Related Settings */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <h2 className="text-sm font-black text-[#06183a]">Related Settings</h2>
            <div className="mt-3 space-y-1">
              {[
                { icon: ShieldCheck, color: '#0f8a77', label: 'Privacy & Data',      sub: 'Control your data and permissions.',   href: '/dashboard/settings/privacy-data' },
                { icon: Link2,       color: '#176dff', label: 'Connected Accounts',  sub: 'Manage linked sign-in methods.',       href: '/dashboard/settings/connected-accounts' },
                { icon: CreditCard,  color: '#f0a638', label: 'Billing & Plan',      sub: 'View your plan and invoices.',         href: '/dashboard/settings/billing' },
              ].map(({ icon: Icon, color, label, sub, href }) => (
                <Link key={label} href={href} className="flex items-start gap-3 rounded-[8px] px-2 py-2.5 hover:bg-[#fff8ee] transition-colors">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} />
                  <div className="flex-1">
                    <p className="text-xs font-black text-[#06183a]">{label}</p>
                    <p className="text-[11px] font-semibold text-[#6b7280]">{sub}</p>
                  </div>
                  <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d3b98f]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Need help? */}
          <div className="rounded-[14px] border border-[#ead7b9] bg-white/76 p-4 shadow-[0_4px_12px_rgba(48,27,5,0.04)]">
            <div className="flex items-center gap-2">
              <CircleHelp className="h-4 w-4 text-[#c97c1e]" />
              <h2 className="text-sm font-black text-[#06183a]">Need help?</h2>
            </div>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#344263]">
              Visit the Help Center for guides and support.
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
