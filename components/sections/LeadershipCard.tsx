import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { User } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { LeadershipMember } from "@/content/about";

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
  return (
    <div
      className={`shrink-0 overflow-hidden rounded-full ring-1 ring-line ${className}`}
      style={{ width: size, height: size }}
    >
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
      <div className="text-center">
        <h3 className="text-lg font-bold text-ink">{member.name ?? "To be announced"}</h3>
        <p className="mt-1 text-sm font-semibold text-accent">{member.role}</p>
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
