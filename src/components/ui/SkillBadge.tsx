import { ToolIcon } from "./ToolIcon";

export function SkillBadge({ name }: { name: string }) {
  return (
    <li className="tag gap-2">
      <ToolIcon name={name} className="size-4" />
      {name}
    </li>
  );
}
