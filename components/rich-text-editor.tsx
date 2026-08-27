"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import { BoldIconEl } from "@/components/icons";
import {
  ItalicIcon,
  UnderlineIcon,
  LinkIcon,
  ListIcon,
  NumberedListIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

export type RichTextEditorHandle = {
  getHtml: () => string;
  getText: () => string;
  clear: () => void;
  setHtml: (html: string) => void;
};

function ToolbarButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(e) => e.preventDefault()} // keep editor selection intact
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded text-ink-muted transition-colors hover:bg-white hover:text-ink"
    >
      {children}
    </button>
  );
}

export const RichTextEditor = forwardRef<
  RichTextEditorHandle,
  { placeholder?: string; onChange?: (html: string, text: string) => void }
>(function RichTextEditor({ placeholder = "Write your message…", onChange }, ref) {
  const editorRef = useRef<HTMLDivElement>(null);

  const emitChange = useCallback(() => {
    if (!editorRef.current || !onChange) return;
    onChange(editorRef.current.innerHTML, editorRef.current.innerText);
  }, [onChange]);

  useImperativeHandle(ref, () => ({
    getHtml: () => editorRef.current?.innerHTML ?? "",
    getText: () => editorRef.current?.innerText ?? "",
    clear: () => {
      if (editorRef.current) editorRef.current.innerHTML = "";
    },
    setHtml: (html: string) => {
      if (editorRef.current) {
        editorRef.current.innerHTML = html;
        emitChange();
      }
    },
  }));

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    emitChange();
  };

  const insertLink = () => {
    const url = window.prompt("Link URL");
    if (url) exec("createLink", url);
  };

  return (
    <div className="overflow-hidden rounded-md border border-line bg-white focus-within:border-accent focus-within:ring-2 focus-within:ring-accent">
      <div className="flex items-center gap-0.5 border-b border-line bg-surface px-2 py-1.5">
        <ToolbarButton label="Bold" onClick={() => exec("bold")}>
          <BoldIconEl size={15} />
        </ToolbarButton>
        <ToolbarButton label="Italic" onClick={() => exec("italic")}>
          <ItalicIcon size={15} />
        </ToolbarButton>
        <ToolbarButton label="Underline" onClick={() => exec("underline")}>
          <UnderlineIcon size={15} />
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-line" />
        <ToolbarButton label="Bulleted list" onClick={() => exec("insertUnorderedList")}>
          <ListIcon size={15} />
        </ToolbarButton>
        <ToolbarButton label="Numbered list" onClick={() => exec("insertOrderedList")}>
          <NumberedListIcon size={15} />
        </ToolbarButton>
        <span className="mx-1 h-4 w-px bg-line" />
        <ToolbarButton label="Insert link" onClick={insertLink}>
          <LinkIcon size={15} />
        </ToolbarButton>
      </div>
      <div
        ref={editorRef}
        className={cn("rte-content px-4 py-3 text-sm leading-relaxed text-ink")}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={emitChange}
        onBlur={emitChange}
      />
    </div>
  );
});
