import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { User } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { LeadershipMember } from "@/content/about";

/** Official LinkedIn mark — blue rounded square with the white "in" glyph. */
function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#0A66C2"
        d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
      <path
        fill="#fff"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"
      />
    </svg>
  );
}

/** Public-folder photos are added by hand; fall back to the icon until the file actually exists. */
function imageExists(publicPath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", publicPath));
  } catch {
    return false;
  }
}

function Portrait({
  member,
  size,
  className = "",
}: {
  member: LeadershipMember;
  size: number;
  className?: string;
}) {
  const hasImage = !!member.image && imageExists(member.image);
  const badgeSize = Math.round(size * 0.3);
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <div className="h-full w-full overflow-hidden rounded-full ring-1 ring-line">
        {hasImage ? (
          <Image
            src={member.image!}
            alt={member.name ?? member.role}
            width={size}
            height={size}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-brand-50 text-accent">
            <User style={{ width: size * 0.4, height: size * 0.4 }} />
          </div>
        )}
      </div>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="absolute bottom-0 right-0 block rounded-[6px] ring-2 ring-surface transition-transform hover:scale-110"
          style={{ width: badgeSize, height: badgeSize }}
        >
          <LinkedInIcon className="h-full w-full rounded-[6px]" />
        </a>
      )}
    </div>
  );
}

/** Featured profile — photo left, name/role/bio right. Use for the founder, full width. */
export function LeadershipFeature({ member }: { member: LeadershipMember }) {
  return (
    <Card className="flex flex-col gap-6 p-8 sm:flex-row sm:items-start sm:gap-8">
      <Portrait member={member} size={144} className="mx-auto sm:mx-0" />
      <div className="min-w-0 text-center sm:text-left">
        <p className="eyebrow text-accent">{member.role}</p>
        <h3 className="mt-2 text-2xl font-bold text-ink">{member.name ?? "To be announced"}</h3>
        {member.bio && (
          <p className="mt-4 text-base leading-relaxed text-muted text-pretty">{member.bio}</p>
        )}
      </div>
    </Card>
  );
}

/** Profile card — photo, name, role and bio. Centered header, left-aligned bio for scannability. */
export function LeadershipSpotlight({ member }: { member: LeadershipMember }) {
  return (
    <Card className="flex h-full flex-col items-center gap-4 p-8">
      <Portrait member={member} size={96} />
      <div className="flex min-h-[6.75rem] flex-col items-center justify-start text-center">
        <h3 className="whitespace-nowrap text-lg font-bold text-ink">{member.name ?? "To be announced"}</h3>
        <p className="mt-1.5 text-sm font-semibold leading-snug text-accent text-pretty">{member.role}</p>
      </div>
      {member.bio && (
        <p className="text-sm leading-relaxed text-muted text-pretty">{member.bio}</p>
      )}
    </Card>
  );
}

/** Compact tile — photo, name, role only. For rosters that link out to the full page. */
export function LeadershipMini({ member }: { member: LeadershipMember }) {
  return (
    <Card className="flex h-full flex-col items-center gap-3 p-6 text-center">
      <Portrait member={member} size={80} />
      <div>
        <p className="font-bold text-ink">{member.name ?? "To be announced"}</p>
        <p className="mt-1 text-xs font-semibold leading-snug text-accent">{member.role}</p>
      </div>
    </Card>
  );
}

/** Compact tile for roles that don't have a profile yet. */
export function LeadershipTile({ member }: { member: LeadershipMember }) {
  return (
    <div className="h-full rounded-lg border border-line bg-surface p-7 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-50 text-accent ring-1 ring-line">
        <User className="h-8 w-8" />
      </div>
      <div className="mt-4 font-bold text-ink">To be announced</div>
      <div className="mt-1 text-sm text-muted">{member.role}</div>
    </div>
  );
}
