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

/** Featured profile card — photo, name, role and bio once supplied. Centered, stacks cleanly in a grid. */
export function LeadershipSpotlight({ member }: { member: LeadershipMember }) {
  const hasImage = !!member.image && imageExists(member.image);
  return (
    <Card className="flex h-full flex-col items-center gap-4 p-8 text-center">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full ring-1 ring-line">
        {hasImage ? (
          <Image
            src={member.image!}
            alt={member.name ?? member.role}
            width={96}
            height={96}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-brand-50 text-accent">
            <User className="h-9 w-9" />
          </div>
        )}
      </div>
      <div>
        <h3 className="text-lg font-bold text-ink">{member.name ?? "To be announced"}</h3>
        <p className="mt-1 text-sm font-semibold text-accent">{member.role}</p>
      </div>
      {member.bio && (
        <p className="text-sm leading-relaxed text-muted">{member.bio}</p>
      )}
    </Card>
  );
}

/** Compact tile for roles that don't have a profile yet. Self-contained card — no shared background, so an uneven grid never leaves a blank filler cell. */
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
