"use client";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { profile } from "@/data/profile";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/utils";

interface Props {
  common: Dictionary["common"];
  className?: string;
  iconSize?: number;
}

/**
 * "View CV" button: opens the PDF in a preview dialog with a download button.
 * Browsers that cannot show PDFs inside a page (most Android phones), and visitors
 * without JavaScript, get the PDF in a new tab instead, via the plain link.
 */
export function CvPreview({ common, className, iconSize = 16 }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  // The PDF is only loaded once someone opens the preview.
  const [opened, setOpened] = useState(false);

  function open(event: MouseEvent<HTMLAnchorElement>) {
    if (navigator.pdfViewerEnabled === false || event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    setOpened(true);
    dialog.current?.showModal();
  }

  return (
    <>
      <a href={profile.cv} target="_blank" rel="noopener" aria-haspopup="dialog" onClick={open} className={cn("btn", className)}>
        <FileText size={iconSize} aria-hidden /> {common.viewCv}
      </a>

      <dialog
        ref={dialog}
        aria-labelledby="cv-preview-title"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto h-[94dvh] w-[min(64rem,96vw)] max-h-none max-w-none overflow-hidden rounded-xl border border-neon/50 bg-surface text-ink backdrop:bg-black/85"
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-wrap items-center gap-3 border-b border-line p-3 md:px-5">
            <h2 id="cv-preview-title" className="mr-auto font-display text-lg font-semibold">{common.cvPreview}</h2>
            <a href={profile.cv} download className="btn btn-primary min-h-10"><Download size={16} aria-hidden /> {common.downloadCv}</a>
            <a href={profile.cv} target="_blank" rel="noopener" className="btn min-h-10">
              <ExternalLink size={16} aria-hidden /> <span className="hidden sm:inline">{common.openNewTab}</span>
              <span className="sr-only sm:hidden">{common.openNewTab}</span>
            </a>
            <button type="button" aria-label={common.close} onClick={() => dialog.current?.close()} className="grid size-10 place-items-center text-neon">
              <X aria-hidden />
            </button>
          </div>
          {opened && <iframe src={`${profile.cv}#view=FitH`} title={common.cvPreview} className="w-full flex-1 bg-white" />}
        </div>
      </dialog>
    </>
  );
}
