"use client";

import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UploadIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function UserIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SlidersHorizontalIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="21" x2="14" y1="4" y2="4" />
      <line x1="10" x2="3" y1="4" y2="4" />
      <line x1="21" x2="12" y1="12" y2="12" />
      <line x1="8" x2="3" y1="12" y2="12" />
      <line x1="21" x2="16" y1="20" y2="20" />
      <line x1="12" x2="3" y1="20" y2="20" />
      <line x1="14" x2="14" y1="2" y2="6" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="16" x2="16" y1="18" y2="22" />
    </svg>
  );
}

function Undo2Icon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 14 4 9l5-5" />
      <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
    </svg>
  );
}

function CheckIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const CHAKRA_SPOKES = [
  { x2: 32.0, y2: 18.0 },
  { x2: 31.52, y2: 21.62 },
  { x2: 30.12, y2: 25.0 },
  { x2: 27.9, y2: 27.9 },
  { x2: 25.0, y2: 30.12 },
  { x2: 21.62, y2: 31.52 },
  { x2: 18.0, y2: 32.0 },
  { x2: 14.38, y2: 31.52 },
  { x2: 11.0, y2: 30.12 },
  { x2: 8.1, y2: 27.9 },
  { x2: 5.88, y2: 25.0 },
  { x2: 4.48, y2: 21.62 },
  { x2: 4.0, y2: 18.0 },
  { x2: 4.48, y2: 14.38 },
  { x2: 5.88, y2: 11.0 },
  { x2: 8.1, y2: 8.1 },
  { x2: 11.0, y2: 5.88 },
  { x2: 14.38, y2: 4.48 },
  { x2: 18.0, y2: 4.0 },
  { x2: 21.62, y2: 4.48 },
  { x2: 25.0, y2: 5.88 },
  { x2: 27.9, y2: 8.1 },
  { x2: 30.12, y2: 11.0 },
  { x2: 31.52, y2: 14.38 },
];

function AshokaChakraIcon({ size = 18, color = "#FFFFFF" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))' }}>
      <circle cx="18" cy="18" r="16" stroke={color} strokeWidth="1.8" />
      <circle cx="18" cy="18" r="14" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />
      <circle cx="18" cy="18" r="3.5" fill={color} />
      <circle cx="18" cy="18" r="1.5" fill="#0d1522" />
      {CHAKRA_SPOKES.map((spoke, idx) => (
        <line
          key={idx}
          x1="18"
          y1="18"
          x2={spoke.x2}
          y2={spoke.y2}
          stroke={color}
          strokeWidth="1.2"
        />
      ))}
      <circle cx="18" cy="18" r="8" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

function NexFellowLogo({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 234 63" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M51.5655 9.32775C48.8684 7.6466 40.7709 15.0879 39.9092 14.2659C39.1925 13.5814 45.0669 8.6946 43.9059 6.85933C42.8592 5.20515 36.2348 7.22535 23.0283 11.3338C16.9689 13.2218 13.8455 14.2621 11.1754 16.9578C10.2456 17.8979 7.28786 20.8878 6.79854 25.2672C6.74973 25.6949 6.73561 26.0507 6.73047 26.2947V43.4363C6.73047 50.7273 13.5244 56.6363 21.9045 56.6363H41.6134C42.8194 56.644 47.8795 56.5516 52.1242 52.9684C52.5403 52.6165 56.9891 48.7533 57.0816 43.3823C57.0816 43.3053 57.0816 43.2411 57.0816 43.2C57.0816 38.2511 57.0816 33.3023 57.0816 28.3534C57.0816 28.207 57.106 27.8564 57.0816 27.3889C57.0225 26.2806 56.7669 25.3058 56.3572 24.2347C55.9295 23.1173 55.3298 22.0783 54.1302 19.9965C53.5973 19.073 52.8459 17.826 52.6764 17.5563C52.4324 17.171 52.4272 17.18 52.3373 16.9578C50.6986 12.9135 52.8138 10.1048 51.5655 9.32775Z" fill="#24B2B4" stroke="black" strokeWidth="0.235419" strokeMiterlimit="10"/>
      <path d="M50.7377 37.8542C49.1631 31.204 42.6157 31.904 42.6157 31.904C42.6157 31.904 39.405 32.0324 37.3681 34.5034C36.3008 35.7993 36.0131 37.2454 35.8153 38.2626C35.0987 41.9536 36.6206 43.6926 35.4082 45.045C34.5811 45.9671 33.1222 45.9966 31.9406 46.0197C30.759 46.0429 29.4003 46.0724 28.5411 45.2492C27.2349 43.9957 28.5064 42.1668 27.6356 38.2651C27.3595 37.0258 27.0769 35.7119 26.0842 34.506C24.046 32.0324 20.8365 31.9065 20.8365 31.9065C20.8365 31.9065 14.2866 31.2066 12.7146 37.8567C12.1867 40.0888 11.8336 40.5396 11.045 41.368C9.84931 42.6176 8.0911 42.9901 6.76184 43.1057C6.72358 44.1346 6.8238 45.164 7.0598 46.1662C7.47431 47.7959 8.20716 49.3275 9.21615 50.6728C9.86729 51.5539 10.6199 52.3553 11.4585 53.0603C13.0173 54.3416 14.8188 55.2947 16.755 55.8626C18.1201 56.2737 19.528 56.5263 20.9508 56.6152C21.4645 56.6486 21.7368 56.6435 23.4334 56.6409C24.8333 56.6409 26.2319 56.6409 27.6305 56.6409C31.152 56.6242 32.9141 56.6153 33.8979 56.6217C36.3381 56.6384 38.7911 56.6217 41.2377 56.6409C42.1638 56.655 43.0898 56.6005 44.0079 56.4778C45.016 56.3444 46.0096 56.1178 46.9759 55.801L47.1737 55.7342C48.6949 55.1927 50.1334 54.4424 51.4479 53.5047C52.3394 52.8332 53.147 52.0571 53.8534 51.1929C54.5084 50.4146 55.6951 48.9826 56.4297 46.8122C56.8346 45.6118 57.0449 44.3545 57.0526 43.0877C56.2512 43.1159 54.0897 43.0877 52.5999 41.7674C52.2108 41.4181 51.5185 41.1535 50.7377 37.8542Z" fill="#FFFEFF" stroke="black" strokeWidth="0.235419" strokeMiterlimit="10"/>
      <path d="M20.643 41.6023C22.5751 41.6023 24.1414 40.036 24.1414 38.1039C24.1414 36.1718 22.5751 34.6055 20.643 34.6055C18.7108 34.6055 17.1445 36.1718 17.1445 38.1039C17.1445 40.036 18.7108 41.6023 20.643 41.6023Z" fill="black"/>
      <path d="M43.1781 41.6023C45.1103 41.6023 46.6766 40.036 46.6766 38.1039C46.6766 36.1718 45.1103 34.6055 43.1781 34.6055C41.246 34.6055 39.6797 36.1718 39.6797 38.1039C39.6797 40.036 41.246 41.6023 43.1781 41.6023Z" fill="black"/>
      <path d="M31.908 50.2509C31.376 50.2507 30.8612 50.0629 30.4541 49.7205C28.7242 48.2692 27.2639 45.9369 26.5473 44.6757C26.3139 44.2688 26.2122 43.7996 26.2561 43.3326C26.3 42.8655 26.4874 42.4236 26.7926 42.0673C27.9984 40.6592 29.6154 39.6647 31.4161 39.2238C31.7432 39.1493 32.083 39.1493 32.4101 39.2238C34.2108 39.6647 35.8278 40.6592 37.0336 42.0673C37.3388 42.4236 37.526 42.8657 37.5697 43.3328C37.6134 43.7998 37.5114 44.269 37.2776 44.6757C36.561 45.9369 35.102 48.2718 33.3708 49.7205C32.9614 50.0649 32.443 50.2529 31.908 50.2509Z" fill="#FBCC18" stroke="black" strokeWidth="0.224343" strokeMiterlimit="10"/>
      <path d="M31.9076 44.5486C29.5149 44.1467 28.0547 43.3594 28.0547 43.3594C29.104 45.7212 31.9076 47.726 31.9076 47.726C31.9076 47.726 34.7177 45.7186 35.7682 43.3594C35.7682 43.3594 34.3015 44.1467 31.9076 44.5486Z" fill="black"/>
      <path d="M88.3048 24.1445L84.1513 44.9117H79.3147L72.4616 33.5199L70.1781 44.9117H64.4219L68.5753 24.1445H73.4107L80.2946 35.5068L82.5485 24.1445H88.3048Z" fill="white"/>
      <path d="M105.927 38.2563H94.1189C94.327 40.0364 95.5432 40.8673 97.7689 40.8673C99.1919 40.8673 100.587 40.4216 101.655 39.5612L103.999 43.0917C101.981 44.5751 99.5785 45.1684 97.1447 45.1684C91.9831 45.1684 88.6016 42.3211 88.6016 37.8402C88.6016 32.5001 92.5469 28.5547 98.3314 28.5547C103.227 28.5547 106.253 31.4033 106.253 35.6184C106.241 36.507 106.132 37.3916 105.927 38.2563ZM94.4451 35.2896H101.062C101.091 33.5686 99.8752 32.5604 98.0656 32.5604C96.1661 32.5604 94.9794 33.6868 94.4451 35.2896Z" fill="white"/>
      <path d="M118.651 36.9256L123.011 44.9063H117.019L114.824 40.6937L110.938 44.9063H104.559L112.598 36.6585L108.36 28.8242H114.268L116.404 32.9186L120.231 28.8242H126.432L118.651 36.9256Z" fill="white"/>
      <path d="M134.284 28.6781L133.364 33.2477H142.532L141.612 37.7864H132.474L131.05 44.9066H125.176L129.327 24.1445H145.585L144.665 28.6833L134.284 28.6781Z" fill="#24B2B4"/>
      <path d="M161.459 38.2563H149.651C149.86 40.0364 151.076 40.8673 153.3 40.8673C154.724 40.8673 156.119 40.4216 157.186 39.5612L159.53 43.0917C157.514 44.5751 155.11 45.1684 152.677 45.1684C147.516 45.1684 144.133 42.3211 144.133 37.8402C144.133 32.5001 148.079 28.5547 153.864 28.5547C158.76 28.5547 161.786 31.4033 161.786 35.6184C161.773 36.5069 161.664 37.3915 161.459 38.2563ZM149.978 35.2896H156.593C156.624 33.5686 155.406 32.5604 153.597 32.5604C151.699 32.5604 150.517 33.6868 149.978 35.2896Z" fill="#24B2B4"/>
      <path d="M166.922 22.8906H172.559L168.168 44.9036H162.531L166.922 22.8906Z" fill="#24B2B4"/>
      <path d="M176.204 22.8906H181.84L177.449 44.9036H171.812L176.204 22.8906Z" fill="#24B2B4"/>
      <path d="M181.602 37.8402C181.602 32.5296 185.725 28.5547 191.48 28.5547C196.618 28.5547 199.907 31.4328 199.907 35.8534C199.907 41.1935 195.783 45.1684 190.027 45.1684C184.9 45.1684 181.602 42.2608 181.602 37.8402ZM194.18 36.1501C194.18 34.2801 193.083 33.0677 191.154 33.0677C188.899 33.0677 187.327 34.8773 187.327 37.5769C187.327 39.4469 188.425 40.6336 190.353 40.6336C192.613 40.6297 194.188 38.8201 194.188 36.1501H194.18Z" fill="#24B2B4"/>
      <path d="M230.464 28.8242L221.683 44.9037H216.106L214.593 36.1525L209.875 44.9037H204.353L201.633 28.8242H206.794L208.248 38.4963L213.559 28.8242H218.396L219.879 38.4963L225.19 28.8242H230.464Z" fill="#24B2B4"/>
    </svg>
  );
}

import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import { getClientProfile } from "@/lib/auth/client";
import { createClient } from "@/lib/supabase/client";

export interface BadgeContentProps {
  userId?: string;
  initialRole?: string;
  initialName?: string;
  initialAvatar?: string;
  initialBadgesCreated?: number;
}

function BadgeContent({
  userId,
  initialRole,
  initialName,
  initialAvatar,
  initialBadgesCreated = 0,
}: BadgeContentProps) {
  const searchParams = useSearchParams();
  const [name, setName] = useState(initialName || "");
  const [photoUrl, setPhotoUrl] = useState<string | null>(initialAvatar || null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const [badgesCount, setBadgesCount] = useState(initialBadgesCreated);

  // Authoritative role determination: Kanish and official maintainers are always Project Admins
  const isKanishOrAdmin =
    (initialName && initialName.toLowerCase().includes("kanish")) ||
    (name && name.toLowerCase().includes("kanish")) ||
    initialRole === "project-admin" ||
    initialRole === "admin";

  const [role, setRole] = useState(
    isKanishOrAdmin ? "project-admin" : (initialRole || "contributor")
  );
  
  const queryRole = searchParams?.get("role");
  const activeRole = (
    queryRole ||
    (isKanishOrAdmin ? "project-admin" : (role || initialRole || "contributor"))
  ).toLowerCase().trim();
  const person = activeRole;

  let roleText = "CONTRIBUTOR";
  let roleColor = "#FF7518";
  let roleBg = "rgba(255, 117, 24, 0.12)";
  let roleBorder = "rgba(255, 117, 24, 0.4)";

  if (person === "mentor") {
    roleText = "MENTOR";
    roleColor = "#f59e0b"; // Premium Amber/Gold
    roleBg = "rgba(245, 158, 11, 0.12)";
    roleBorder = "rgba(245, 158, 11, 0.4)";
  } else if (person === "project-admin" || person === "project_admin") {
    roleText = "PROJECT ADMIN";
    roleColor = "#ef4444"; // Crimson Red
    roleBg = "rgba(239, 68, 68, 0.12)";
    roleBorder = "rgba(239, 68, 68, 0.4)";
  } else if (person === "admin") {
    roleText = "ADMIN";
    roleColor = "#ef4444"; // Crimson Red
    roleBg = "rgba(239, 68, 68, 0.12)";
    roleBorder = "rgba(239, 68, 68, 0.4)";
  }

  // Client-side fallback to fetch profile/avatar if not supplied initially by SSR
  useEffect(() => {
    getClientProfile().then((clientProf) => {
      if (!photoUrl && clientProf?.avatar) {
        setPhotoUrl(clientProf.avatar);
      }
      if (!name && clientProf?.name) {
        setName(clientProf.name);
      }
      if (clientProf?.role && !isKanishOrAdmin) {
        setRole(clientProf.role);
      }
    });
  }, [photoUrl, name, isKanishOrAdmin]);

  // Listen to active Supabase auth changes
  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const u = session.user;
        if (!photoUrl) {
          const identities = (u.identities || []) as Array<{ identity_data?: { avatar_url?: string; picture?: string } }>;
          const identAvatar =
            identities.find((i) => i.identity_data?.avatar_url || i.identity_data?.picture)?.identity_data?.avatar_url ||
            identities.find((i) => i.identity_data?.avatar_url || i.identity_data?.picture)?.identity_data?.picture;
          const gHandle = u.user_metadata?.user_name || u.user_metadata?.preferred_username;
          const av =
            u.user_metadata?.avatar_url ||
            u.user_metadata?.picture ||
            identAvatar ||
            (gHandle ? `https://avatars.githubusercontent.com/${gHandle}` : null);
          if (av) {
            setPhotoUrl(av);
          }
        }
        if (!name) {
          const gHandle = u.user_metadata?.user_name || u.user_metadata?.preferred_username;
          const nm = u.user_metadata?.full_name || u.user_metadata?.name || gHandle || (u.email ? u.email.split("@")[0] : "");
          if (nm) setName(nm);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [photoUrl, name]);
  
  // Image Controls State
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAdjusting, setIsAdjusting] = useState(false);
  
  // Dragging State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setPhotoUrl(imageUrl);
      
      // Reset transforms
      setScale(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setIsAdjusting(true);
    }
  };

  const handleDownload = async () => {
    if (userId && badgesCount >= 3) {
      alert("Maximum badge creation limit reached (3 badges per account).");
      return;
    }

    if (badgeRef.current) {
      try {
        // If photoUrl is external, proxy it to base64 to ensure clean canvas export without CORS taint
        if (photoUrl && photoUrl.startsWith("http") && typeof window !== "undefined" && !photoUrl.startsWith(window.location.origin)) {
          try {
            const proxyRes = await fetch(`/api/badge/proxy-image?url=${encodeURIComponent(photoUrl)}`);
            if (proxyRes.ok) {
              const blob = await proxyRes.blob();
              const base64 = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
              });
              setPhotoUrl(base64);
              await new Promise((r) => setTimeout(r, 120));
            }
          } catch (proxyErr) {
            console.warn("Notice: proxy image conversion for canvas:", proxyErr);
          }
        }

        if (typeof document !== "undefined" && "fonts" in document) {
          await document.fonts.ready;
        }

        const canvas = await html2canvas(badgeRef.current, {
          backgroundColor: null,
          scale: 3, 
          useCORS: true,
          logging: false,
          onclone: (clonedDoc) => {
            const clonedBadge = clonedDoc.querySelector('.badge-container') as HTMLElement;
            if (clonedBadge) {
              // 1. Remove all outer box shadows so html2canvas bounds match the card exactly
              clonedBadge.style.boxShadow = 'none';
              clonedBadge.style.filter = 'none';
              clonedBadge.style.margin = '0';
              clonedBadge.style.width = '300px';
              clonedBadge.style.maxWidth = '300px';
              clonedBadge.style.minWidth = '300px';

              // 2. Remove harsh textShadow artifacts in html2canvas
              clonedBadge.querySelectorAll('h2, span, p, div').forEach((node) => {
                const el = node as HTMLElement;
                if (el.style && el.style.textShadow) {
                  el.style.textShadow = 'none';
                }
              });

              // 3. Ensure top flag bar is flush with card's top rounded corners and has 3 equal stripes
              const topBar = (clonedBadge.querySelector('.flag-bar-top') || clonedBadge.children[0]) as HTMLElement;
              if (topBar) {
                topBar.style.display = 'flex';
                topBar.style.width = '100%';
                topBar.style.height = '5px';
                topBar.style.borderTopLeftRadius = '24px';
                topBar.style.borderTopRightRadius = '24px';
                topBar.style.overflow = 'hidden';
                const c0 = topBar.children[0] as HTMLElement;
                const c1 = topBar.children[1] as HTMLElement;
                const c2 = topBar.children[2] as HTMLElement;
                if (c0) { c0.style.width = '33.333%'; c0.style.height = '100%'; c0.style.borderTopLeftRadius = '24px'; c0.style.background = '#FF7518'; }
                if (c1) { c1.style.width = '33.334%'; c1.style.height = '100%'; c1.style.background = '#FFFFFF'; }
                if (c2) { c2.style.width = '33.333%'; c2.style.height = '100%'; c2.style.borderTopRightRadius = '24px'; c2.style.background = '#00A843'; }
              }

              // 4. Ensure bottom flag bar is flush with card's bottom rounded corners and has 3 equal stripes
              const bottomBar = (clonedBadge.querySelector('.flag-bar-bottom') || clonedBadge.children[1]) as HTMLElement;
              if (bottomBar) {
                bottomBar.style.display = 'flex';
                bottomBar.style.width = '100%';
                bottomBar.style.height = '5px';
                bottomBar.style.borderBottomLeftRadius = '24px';
                bottomBar.style.borderBottomRightRadius = '24px';
                bottomBar.style.overflow = 'hidden';
                const c0 = bottomBar.children[0] as HTMLElement;
                const c1 = bottomBar.children[1] as HTMLElement;
                const c2 = bottomBar.children[2] as HTMLElement;
                if (c0) { c0.style.width = '33.333%'; c0.style.height = '100%'; c0.style.borderBottomLeftRadius = '24px'; c0.style.background = '#FF7518'; }
                if (c1) { c1.style.width = '33.334%'; c1.style.height = '100%'; c1.style.background = '#FFFFFF'; }
                if (c2) { c2.style.width = '33.333%'; c2.style.height = '100%'; c2.style.borderBottomRightRadius = '24px'; c2.style.background = '#00A843'; }
              }

              // 5. Fix badge header alignment: use HTML table so emblem logo and 2-line text are 100% vertically centered
              const clonedHeader = clonedBadge.querySelector('.badge-header') as HTMLElement;
              if (clonedHeader) {
                const imgEl = clonedHeader.querySelector('img') as HTMLImageElement;
                const imgSrc = imgEl ? imgEl.src : '/mobile-logo.png';

                clonedHeader.style.display = 'block';
                clonedHeader.style.margin = '0 auto';
                clonedHeader.style.padding = '0';
                clonedHeader.style.width = 'fit-content';
                clonedHeader.innerHTML = `
                  <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto; border-collapse: collapse; border-spacing: 0; border: none; padding: 0;">
                    <tbody>
                      <tr>
                        <td valign="middle" style="vertical-align: middle; padding: 0 9px 0 0; border: none; line-height: 0; font-size: 0;">
                          <img src="${imgSrc}" alt="OSCI Logo" style="width: 33px; height: 33px; display: block; object-fit: contain; border: none;" />
                        </td>
                        <td valign="middle" style="vertical-align: middle; text-align: left; border: none; padding: 0; line-height: 1.2;">
                          <div style="color: #FF7518; font-weight: 800; font-size: 14px; letter-spacing: -0.2px; line-height: 1.2; font-family: Inter, system-ui, -apple-system, sans-serif;">Open Source</div>
                          <div style="font-weight: 800; font-size: 14px; letter-spacing: -0.2px; line-height: 1.2; font-family: Inter, system-ui, -apple-system, sans-serif;"><span style="color: #FFFFFF;">Connect </span><span style="color: #00D26A;">India</span></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                `;
              }

              // 6. Fix header dots divider: ensure gradient lines and 3 dots render with exact spacing
              const clonedDotsDivider = clonedBadge.querySelector('.header-dots-divider') as HTMLElement;
              if (clonedDotsDivider) {
                clonedDotsDivider.innerHTML = `
                  <table cellpadding="0" cellspacing="0" border="0" style="width: 180px; margin: 0 auto; border-collapse: collapse; border-spacing: 0; border: none; padding: 0;">
                    <tbody>
                      <tr>
                        <td valign="middle" style="vertical-align: middle; border: none; padding: 0; width: 42%;">
                          <div style="width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18));"></div>
                        </td>
                        <td valign="middle" align="center" style="vertical-align: middle; text-align: center; border: none; padding: 0 7px; white-space: nowrap; line-height: 0; font-size: 0; width: 16%;">
                          <span style="display: inline-block; width: 3.5px; height: 3.5px; border-radius: 50%; background: #FF7518; margin: 0 2.5px;"></span>
                          <span style="display: inline-block; width: 3.5px; height: 3.5px; border-radius: 50%; background: #FFFFFF; margin: 0 2.5px;"></span>
                          <span style="display: inline-block; width: 3.5px; height: 3.5px; border-radius: 50%; background: #00D26A; margin: 0 2.5px;"></span>
                        </td>
                        <td valign="middle" style="vertical-align: middle; border: none; padding: 0; width: 42%;">
                          <div style="width: 100%; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,0.18), transparent);"></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                `;
              }

              // 7. Fix role pill for html2canvas: use a table inside the 24px capsule so the 6px dot
              //    and 11px uppercase text are perfectly vertically centered and match the live preview exactly
              const clonedPill = clonedBadge.querySelector('.role-pill') as HTMLElement;
              if (clonedPill) {
                clonedPill.style.display = 'block';
                clonedPill.style.margin = '0 auto 8px auto';
                clonedPill.style.height = '24px';
                clonedPill.style.width = 'fit-content';
                clonedPill.style.padding = '0 14px';
                clonedPill.style.borderRadius = '9999px';
                clonedPill.style.background = 'rgba(15, 22, 33, 0.95)';
                clonedPill.style.border = `1px solid ${roleBorder}`;
                clonedPill.style.boxShadow = `0 0 12px ${roleBg.replace('0.1', '0.25')}`;
                clonedPill.style.boxSizing = 'border-box';
                clonedPill.style.overflow = 'hidden';

                clonedPill.innerHTML = `
                  <table cellpadding="0" cellspacing="0" border="0" style="height: 22px; margin: 0 auto; border-collapse: collapse; border-spacing: 0; border: none; padding: 0;">
                    <tbody>
                      <tr style="height: 22px;">
                        <td valign="middle" style="vertical-align: middle; padding: 0 7px 0 0; border: none; line-height: 0; font-size: 0;">
                          <div style="width: 6px; height: 6px; min-width: 6px; min-height: 6px; border-radius: 50%; background: ${roleColor}; box-shadow: 0 0 6px ${roleColor}; display: block;"></div>
                        </td>
                        <td valign="middle" style="vertical-align: middle; border: none; padding: 0; color: ${roleColor}; font-size: 11px; font-weight: 800; letter-spacing: 0.16em; line-height: 1; text-transform: uppercase; white-space: nowrap; font-family: Inter, system-ui, -apple-system, sans-serif;">
                          ${roleText}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                `;
              }

              // 8. Ensure avatar container has no dark inset shadow and image has 100% full brightness
              const avatarContainer = clonedBadge.querySelector('.avatar-photo-container') as HTMLElement;
              if (avatarContainer) {
                avatarContainer.style.boxShadow = 'none';
              }
              const avatarImg = clonedBadge.querySelector('.avatar-photo-img') as HTMLImageElement;
              if (avatarImg) {
                avatarImg.style.filter = 'none';
                avatarImg.style.opacity = '1';
              }
            }
          },
        });

        // Ensure razor-sharp rounded corners with pure alpha transparency outside the card
        const outputCanvas = document.createElement("canvas");
        outputCanvas.width = canvas.width;
        outputCanvas.height = canvas.height;
        const ctx = outputCanvas.getContext("2d");
        let url = "";

        if (ctx) {
          const cornerRadius = 24 * (canvas.width / 300);
          ctx.beginPath();
          ctx.moveTo(cornerRadius, 0);
          ctx.lineTo(canvas.width - cornerRadius, 0);
          ctx.arcTo(canvas.width, 0, canvas.width, cornerRadius, cornerRadius);
          ctx.lineTo(canvas.width, canvas.height - cornerRadius);
          ctx.arcTo(canvas.width, canvas.height, canvas.width - cornerRadius, canvas.height, cornerRadius);
          ctx.lineTo(cornerRadius, canvas.height);
          ctx.arcTo(0, canvas.height, 0, canvas.height - cornerRadius, cornerRadius);
          ctx.lineTo(0, cornerRadius);
          ctx.arcTo(0, 0, cornerRadius, 0, cornerRadius);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(canvas, 0, 0);

          url = outputCanvas.toDataURL("image/png");
        } else {
          url = canvas.toDataURL("image/png");
        }

        const link = document.createElement("a");
        link.download = `OSCI-Badge-${name || roleText}.png`;
        link.href = url;
        link.click();

        // Increment server-side badge count if logged in via API route
        if (userId) {
          const res = await fetch("/api/badge/increment", { method: "POST" });
          const resData = await res.json();
          if (res.ok && resData.success && resData.count !== undefined) {
            setBadgesCount(resData.count);
          }
        }
      } catch (err) {
        console.error("Failed to generate badge:", err);
      }
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!photoUrl) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) setIsDragging(false);
  };

  const resetAdjustments = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans">
      <Navbar />
      {/* Spacer to clear the fixed Navbar */}
      <div style={{ height: '96px', width: '100%', flexShrink: 0 }} aria-hidden="true" />
      
      <main className="flex-grow flex flex-col items-center py-12" style={{ margin: '0 auto', maxWidth: '1280px', width: '100%', paddingBottom: '96px', paddingLeft: 'clamp(20px, 5vw, 64px)', paddingRight: 'clamp(20px, 5vw, 64px)', overflowX: 'hidden', boxSizing: 'border-box' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ background: roleBg, border: `1px solid ${roleColor}`, color: roleColor, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: roleColor }}></div>
            {roleText} Recognition
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight" style={{ marginBottom: '16px', wordBreak: 'break-word' }}>
            {roleText === "CONTRIBUTOR" ? "Contributor" : roleText === "MENTOR" ? "Mentor" : roleText === "PROJECT ADMIN" ? "Project Admin" : "Admin"} <span style={{ color: roleColor }}>Badge</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-[15px]" style={{ maxWidth: '400px', textAlign: 'center', lineHeight: '1.6', padding: '0 16px' }}>
            Create your personalized OSCI badge to celebrate your contribution to open source.
          </p>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 justify-center items-center lg:items-start w-full max-w-[1000px]">
          
          {/* LEFT: Live Preview */}
          <div className="w-full flex flex-col items-center flex-1 box-border" style={{ minWidth: 0, maxWidth: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px', width: '100%', maxWidth: '300px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
              <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.22em', color: '#9ca3af' }}>LIVE PREVIEW</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
            </div>

            {/* The Badge Itself */}
            <div 
              style={{
                position: 'relative',
                padding: 'clamp(6px, 2.5vw, 12px)',
                borderRadius: '28px',
                background: 'rgba(255, 255, 255, 0.02)',
                width: '100%',
                maxWidth: '324px',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {/* Outer Glow */}
              <div 
                style={{ 
                  position: 'absolute', 
                  inset: '-4px', 
                  background: 'radial-gradient(ellipse at 50% 15%, rgba(255, 117, 24, 0.18) 0%, transparent 65%), radial-gradient(ellipse at 50% 85%, rgba(0, 200, 83, 0.15) 0%, transparent 65%)', 
                  filter: 'blur(28px)', 
                  borderRadius: '32px', 
                  zIndex: 0,
                  pointerEvents: 'none',
                }} 
              />
              
              <div 
                ref={badgeRef}
                className="badge-container"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '300px',
                  margin: '0 auto',
                  background: 'linear-gradient(180deg, #0d1522 0%, #080c14 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '18px 16px 14px',
                  boxShadow: '0 20px 55px -10px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                  zIndex: 1,
                  overflow: 'hidden',
                  boxSizing: 'border-box'
                }}
              >
                {/* Top Indian Flag Accent Bar */}
                <div 
                  className="flag-bar-top"
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    height: '5px', 
                    display: 'flex', 
                    width: '100%',
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                    overflow: 'hidden',
                    zIndex: 10 
                  }}
                >
                  <div style={{ flex: 1, width: '33.333%', height: '100%', background: '#FF7518', borderTopLeftRadius: '24px' }} />
                  <div style={{ flex: 1, width: '33.334%', height: '100%', background: '#FFFFFF' }} />
                  <div style={{ flex: 1, width: '33.333%', height: '100%', background: '#00A843', borderTopRightRadius: '24px' }} />
                </div>

                {/* Bottom Indian Flag Accent Bar */}
                <div 
                  className="flag-bar-bottom"
                  style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    height: '5px', 
                    display: 'flex', 
                    width: '100%',
                    borderBottomLeftRadius: '24px',
                    borderBottomRightRadius: '24px',
                    overflow: 'hidden',
                    zIndex: 10 
                  }}
                >
                  <div style={{ flex: 1, width: '33.333%', height: '100%', background: '#FF7518', borderBottomLeftRadius: '24px' }} />
                  <div style={{ flex: 1, width: '33.334%', height: '100%', background: '#FFFFFF' }} />
                  <div style={{ flex: 1, width: '33.333%', height: '100%', background: '#00A843', borderBottomRightRadius: '24px' }} />
                </div>

                {/* Ambient lighting accents inside badge */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    height: '100%', 
                    background: 'radial-gradient(circle at 50% 32%, rgba(255, 117, 24, 0.08) 0%, rgba(0, 200, 83, 0.04) 55%, transparent 75%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }} 
                />

                {/* Badge Header: Emblem + Tricolor Text */}
                <div className="badge-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px', zIndex: 2 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/mobile-logo.png" 
                    alt="OSCI Logo" 
                    style={{ width: '33px', height: '33px', objectFit: 'contain' }}
                    crossOrigin="anonymous"
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: '1.2' }}>
                    <span style={{ color: '#FF7518', fontWeight: 800, fontSize: '14px', letterSpacing: '-0.2px' }}>
                      Open Source
                    </span>
                    <span style={{ fontWeight: 800, fontSize: '14px', letterSpacing: '-0.2px' }}>
                      <span style={{ color: '#FFFFFF' }}>Connect </span>
                      <span style={{ color: '#00D26A' }}>India</span>
                    </span>
                  </div>
                </div>

                {/* Divider Line with 3 Tricolor Dots */}
                <div className="header-dots-divider" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '180px', margin: '11px auto 0', zIndex: 2 }}>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18))' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0 7px' }}>
                    <div style={{ width: '3.5px', height: '3.5px', borderRadius: '50%', background: '#FF7518' }} />
                    <div style={{ width: '3.5px', height: '3.5px', borderRadius: '50%', background: '#FFFFFF' }} />
                    <div style={{ width: '3.5px', height: '3.5px', borderRadius: '50%', background: '#00D26A' }} />
                  </div>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.18), transparent)' }} />
                </div>

                {/* Avatar with Seamless Tricolor Ring and Precision Neon Glow */}
                <div style={{ position: 'relative', width: '186px', height: '186px', margin: '11px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                  {/* SVG Tricolor Ring with Seamless Butt Joints and Zero-Clipping Filters */}
                  <svg 
                    width="186" 
                    height="186" 
                    viewBox="0 0 210 210" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}
                  >
                    <defs>
                      {/* Non-clipping Gaussian Blur for soft ambient backlight */}
                      <filter id="wideAmbientBlur" filterUnits="userSpaceOnUse" x="0" y="0" width="210" height="210">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
                      </filter>

                      {/* Non-clipping Neon Glows covering entire SVG canvas */}
                      <filter id="neonOrange" filterUnits="userSpaceOnUse" x="0" y="0" width="210" height="210">
                        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#FF7518" floodOpacity="1" />
                        <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#FF7518" floodOpacity="0.8" />
                        <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#FF7518" floodOpacity="0.35" />
                      </filter>

                      <filter id="neonGreen" filterUnits="userSpaceOnUse" x="0" y="0" width="210" height="210">
                        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#00C853" floodOpacity="1" />
                        <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00C853" floodOpacity="0.8" />
                        <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#00C853" floodOpacity="0.35" />
                      </filter>

                      <filter id="neonWhite" filterUnits="userSpaceOnUse" x="0" y="0" width="210" height="210">
                        <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#FFFFFF" floodOpacity="0.9" />
                        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FFFFFF" floodOpacity="0.4" />
                      </filter>
                    </defs>

                    {/* Subtle outer track hairline circle */}
                    <circle cx="105" cy="105" r="95" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" fill="none" />

                    {/* --- Ambient Backlight Rays (Orange & Green only, no white boxes) --- */}
                    <path 
                      d="M 28.971 74.282 A 82 82 0 1 1 178.701 140.946" 
                      stroke="#FF7518" 
                      strokeWidth="14" 
                      strokeLinecap="butt"
                      opacity="0.22"
                      filter="url(#wideAmbientBlur)"
                    />
                    <path 
                      d="M 167.816 157.709 A 82 82 0 0 1 23.798 93.588" 
                      stroke="#00C853" 
                      strokeWidth="14" 
                      strokeLinecap="butt"
                      opacity="0.18"
                      filter="url(#wideAmbientBlur)"
                    />

                    {/* --- Seamless Continuous 360° Tricolor Ring --- */}
                    {/* Saffron / Orange Arc */}
                    <path 
                      d="M 28.971 74.282 A 82 82 0 1 1 178.701 140.946" 
                      stroke="#FF7518" 
                      strokeWidth="4.5" 
                      strokeLinecap="butt"
                      filter="url(#neonOrange)"
                    />

                    {/* White Right Transition Notch */}
                    <path 
                      d="M 178.701 140.946 A 82 82 0 0 1 167.816 157.709" 
                      stroke="#FFFFFF" 
                      strokeWidth="4.5" 
                      strokeLinecap="butt"
                      filter="url(#neonWhite)"
                    />

                    {/* Green Bottom Arc */}
                    <path 
                      d="M 167.816 157.709 A 82 82 0 0 1 23.798 93.588" 
                      stroke="#00C853" 
                      strokeWidth="4.5" 
                      strokeLinecap="butt"
                      filter="url(#neonGreen)"
                    />

                    {/* White Left Transition Notch */}
                    <path 
                      d="M 23.798 93.588 A 82 82 0 0 1 28.971 74.282" 
                      stroke="#FFFFFF" 
                      strokeWidth="4.5" 
                      strokeLinecap="butt"
                      filter="url(#neonWhite)"
                    />
                  </svg>

                  {/* Hidden file input for direct circle click */}
                  <input 
                    ref={avatarFileInputRef}
                    type="file" 
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />

                  {/* Inner Photo Container */}
                  <div 
                    className="avatar-photo-container"
                    style={{
                      position: 'absolute',
                      top: '28px',
                      left: '28px',
                      width: '130px',
                      height: '130px',
                      borderRadius: '50%',
                      background: '#090e18',
                      border: '1.5px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      cursor: photoUrl ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
                      zIndex: 4,
                    }}
                    onClick={() => {
                      if (!photoUrl) {
                        avatarFileInputRef.current?.click();
                      }
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={(e) => {
                      if (!photoUrl) return;
                      setIsDragging(true);
                      setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
                    }}
                    onTouchMove={(e) => {
                      if (!isDragging) return;
                      setPosition({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y });
                    }}
                    onTouchEnd={handleMouseUp}
                  >
                    {photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        className="avatar-photo-img"
                        src={photoUrl} 
                        alt="Avatar" 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover',
                          transform: `scale(${scale}) rotate(${rotation}deg) translate(${position.x / scale}px, ${position.y / scale}px)`,
                          transformOrigin: 'center center',
                          pointerEvents: 'none',
                          filter: 'none',
                          opacity: 1,
                        }} 
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.dataset.retried && photoUrl && photoUrl.startsWith("http")) {
                            target.dataset.retried = "true";
                            target.src = `/api/badge/proxy-image?url=${encodeURIComponent(photoUrl)}`;
                          }
                        }}
                      />
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', userSelect: 'none' }}>
                        <UserIcon style={{ width: '34px', height: '34px', color: '#475569' }} />
                        <span style={{ color: '#64748b', fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', marginTop: '6px' }}>
                          UPLOAD PHOTO
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Verified Checkmark Badge at ~4:30 o'clock */}
                  <div 
                    style={{
                      position: 'absolute',
                      left: '132px',
                      top: '132px',
                      width: '25px',
                      height: '25px',
                      borderRadius: '50%',
                      background: roleColor,
                      border: '2.5px solid #080d16',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 10px ${roleBg.replace('0.12', '0.75')}, 0 2px 5px rgba(0, 0, 0, 0.7)`,
                      zIndex: 5,
                    }}
                  >
                    {person === 'mentor' ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ) : (person === 'project-admin' || person === 'project_admin' || person === 'admin') ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Chakra Divider */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '150px', margin: '11px auto 8px', zIndex: 2 }}>
                  <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, transparent, #FF7518)' }} />
                  <div style={{ padding: '0 7px', display: 'flex', alignItems: 'center' }}>
                    <AshokaChakraIcon size={16} />
                  </div>
                  <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(90deg, #00C853, transparent)' }} />
                </div>

                {/* Name */}
                <h2 
                  style={{ 
                    color: '#FFFFFF', 
                    fontSize: (name && name.length > 16) ? '18px' : '21px', 
                    fontWeight: 800, 
                    marginBottom: '8px',
                    textAlign: 'center',
                    zIndex: 2,
                    wordBreak: 'break-word',
                    maxWidth: '92%',
                    letterSpacing: '-0.3px',
                    lineHeight: '1.2',
                  }}
                >
                  {name || "Your Name"}
                </h2>

                {/* Role Pill */}
                <div 
                  className="role-pill"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    height: '24px',
                    padding: '0 14px',
                    borderRadius: '9999px',
                    background: 'rgba(15, 22, 33, 0.95)',
                    border: `1px solid ${roleBorder}`,
                    boxShadow: `0 0 12px ${roleBg.replace('0.1', '0.25')}`,
                    zIndex: 4,
                    marginBottom: '8px',
                    lineHeight: '1',
                    boxSizing: 'border-box',
                  }}
                >
                  <span 
                    className="role-dot"
                    style={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      minWidth: '6px',
                      minHeight: '6px',
                      borderRadius: '50%',
                      background: roleColor,
                      boxShadow: `0 0 6px ${roleColor}`,
                      marginRight: '7px',
                      verticalAlign: 'middle',
                      flexShrink: 0,
                    }}
                  />
                  <span 
                    className="role-text"
                    style={{
                      display: 'inline-block',
                      color: roleColor,
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.16em',
                      lineHeight: '1',
                      verticalAlign: 'middle',
                      textTransform: 'uppercase',
                    }}
                  >
                    {roleText}
                  </span>
                </div>

                {/* Year */}
                <div style={{ color: '#93c5fd', fontSize: '13.5px', fontWeight: 800, letterSpacing: '0.08em', zIndex: 2 }}>
                  • 2026 •
                </div>

                {/* Powered By */}
                <div style={{ color: '#9ca3af', fontSize: '10px', fontStyle: 'italic', fontWeight: 500, marginTop: '2px', marginBottom: '5px', zIndex: 2 }}>
                  Powered By
                </div>

                {/* NexFellow Sponsor Logo */}
                <div style={{ display: 'flex', justifyContent: 'center', zIndex: 2, marginBottom: '14px' }}>
                  <NexFellowLogo style={{ width: '104px', height: '25px' }} />
                </div>
              </div>
            </div>

            <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span style={{ width: '5.5px', height: '5.5px', borderRadius: '50%', background: '#FF7518' }}></span>
              Updates live as you type
            </p>
          </div>

          {/* RIGHT: Form */}
          <div className="w-full flex flex-col flex-1 max-w-[480px] box-border" style={{ minWidth: 0 }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight" style={{ marginBottom: '12px' }}>Create Your <span className="text-[var(--orange)] italic">Badge</span></h2>
            <p className="text-[var(--text-secondary)] text-[14px]" style={{ lineHeight: '1.6', marginBottom: '32px', color: '#9ca3af' }}>
              Personalize your badge with your name and photo. Download and share your achievement.
            </p>

            {/* Form using flex styling to avoid Tailwind gap issues */}
            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '32px' }}>
              
              {/* Name Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'white', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <UserIcon style={{ width: '14px', height: '14px', color: 'var(--orange)' }} />
                  YOUR NAME <span style={{ color: 'red' }}>*</span>
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 30))}
                  placeholder="Enter your full name"
                  className="w-full bg-[#1c1c1f] text-white text-[14px] placeholder-gray-500 rounded-xl border border-[rgba(255,255,255,0.05)] focus:outline-none focus:border-[var(--orange)] focus:ring-1 focus:ring-[var(--orange)] transition-all"
                  style={{ padding: '16px' }}
                />
                <span style={{ color: 'gray', fontSize: '11px', alignSelf: 'flex-start' }}>{name.length}/30 characters</span>
              </div>

              {/* Photo Upload / Adjust Field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'white', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <UploadIcon style={{ width: '14px', height: '14px', color: 'var(--orange)' }} />
                  YOUR PHOTO <span style={{ color: 'red' }}>*</span>
                </label>
                
                {!photoUrl ? (
                  // Initial Upload Box
                  <div style={{ position: 'relative', width: '100%', height: '140px', background: '#1c1c1f', border: '1px dashed rgba(255, 96, 0, 0.4)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', cursor: 'pointer' }} className="hover:border-[var(--orange)] hover:bg-[#252529]">
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg"
                      onChange={handlePhotoUpload}
                      style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}
                    />
                    <UploadIcon style={{ width: '28px', height: '28px', color: 'var(--orange)', marginBottom: '12px' }} />
                    <p style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>
                      Drop your photo here or <span style={{ color: 'var(--orange)' }}>browse</span>
                    </p>
                    <p style={{ color: 'gray', fontSize: '11px', marginTop: '4px' }}>JPG or PNG • Auto-cropped to square</p>
                  </div>
                ) : (
                  // Photo Uploaded & Adjustment Tools
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Compact Status Bar */}
                    <div style={{ background: '#1c1c1f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg)', border: '2px solid var(--orange)', overflow: 'hidden' }}>
                          <img src={photoUrl} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <p style={{ color: 'var(--orange)', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckIcon style={{ width: '12px', height: '12px' }} /> Photo uploaded
                          </p>
                          <p style={{ color: 'gray', fontSize: '11px' }}>Ready for your badge</p>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setIsAdjusting(!isAdjusting)}
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        className="hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                      >
                        <SlidersHorizontalIcon style={{ width: '14px', height: '14px' }} />
                        {isAdjusting ? 'Close' : 'Adjust'}
                      </button>
                    </div>

                    {/* Advanced Adjust Panel */}
                    {isAdjusting && (
                      <div style={{ background: '#161618', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                          <h4 style={{ color: 'white', fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>Adjust Your Image</h4>
                          <p style={{ color: 'gray', fontSize: '12px' }}>Fine-tune position and size by dragging the image.</p>
                        </div>

                        {/* Scale Slider */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label style={{ color: 'gray', fontSize: '12px' }}>Scale</label>
                            <span style={{ color: 'var(--orange)', fontSize: '12px', fontWeight: 600 }}>{scale.toFixed(2)}x</span>
                          </div>
                          <input 
                            type="range" 
                            min="0.5" max="3" step="0.1" 
                            value={scale} 
                            onChange={(e) => setScale(parseFloat(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--orange)' }}
                          />
                        </div>

                        {/* Rotation Slider */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <label style={{ color: 'gray', fontSize: '12px' }}>Rotation</label>
                            <span style={{ color: 'var(--orange)', fontSize: '12px', fontWeight: 600 }}>{rotation}°</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" max="360" step="1" 
                            value={rotation} 
                            onChange={(e) => setRotation(parseFloat(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--orange)' }}
                          />
                        </div>

                        {/* Quick Rotate Buttons */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {[0, 90, 180, 270].map((deg) => (
                            <button
                              key={deg}
                              type="button"
                              onClick={() => setRotation(deg)}
                              style={{ 
                                flex: '1', 
                                padding: '8px', 
                                borderRadius: '8px', 
                                fontSize: '12px', 
                                fontWeight: 600,
                                background: rotation === deg ? 'var(--orange)' : 'rgba(255,255,255,0.05)',
                                color: rotation === deg ? 'white' : 'gray',
                                border: '1px solid rgba(255,255,255,0.1)',
                              }}
                            >
                              {deg}°
                            </button>
                          ))}
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                          <button 
                            type="button" 
                            onClick={resetAdjustments}
                            style={{ flex: '1', background: 'rgba(255,96,0,0.1)', color: 'var(--orange)', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
                          >
                            <Undo2Icon style={{ width: '14px', height: '14px' }} /> Reset All
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setIsAdjusting(false)}
                            style={{ flex: '1', background: 'var(--orange)', color: 'white', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
                          >
                            <CheckIcon style={{ width: '14px', height: '14px' }} /> Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Main Actions (Upload / Download) */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
                <div style={{ position: 'relative', flex: '1 1 120px' }}>
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg"
                    onChange={handlePhotoUpload}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%', zIndex: 10 }}
                  />
                  <button 
                    type="button"
                    style={{ width: '100%', background: '#1c1c1f', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '16px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em', position: 'relative' }}
                    className="hover:bg-[#252529] transition-colors"
                  >
                    {photoUrl ? "CHANGE IMG" : "UPLOAD IMG"}
                  </button>
                </div>
                
                <button 
                  type="button"
                  onClick={handleDownload}
                  disabled={badgesCount >= 3}
                  style={{
                    flex: '1 1 120px',
                    background: badgesCount >= 3 ? '#3f3f46' : 'var(--orange)',
                    color: badgesCount >= 3 ? '#9ca3af' : 'white',
                    padding: '16px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    boxShadow: badgesCount >= 3 ? 'none' : '0 8px 20px rgba(255, 96, 0, 0.2)',
                    cursor: badgesCount >= 3 ? 'not-allowed' : 'pointer',
                  }}
                  className={badgesCount >= 3 ? "" : "hover:bg-[var(--orange-dark)] transition-colors"}
                >
                  {badgesCount >= 3 ? "LIMIT REACHED (3/3)" : "DOWNLOAD"}
                </button>
              </div>

              {/* Badge Limit Indicator */}
              <div style={{ textAlign: "center", fontSize: "12px", color: badgesCount >= 3 ? "#ef4444" : "#9ca3af", marginTop: "4px" }}>
                {badgesCount >= 3
                  ? "⚠️ Account limit reached: You have already created 3/3 badges."
                  : `Badge creation limit: ${badgesCount}/3 generated`}
              </div>

            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BadgeContent;
