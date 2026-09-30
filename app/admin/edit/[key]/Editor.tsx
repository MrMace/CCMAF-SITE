"use client";

import { useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { resetContent, saveContent } from "../../actions";
import type { ContentKey } from "@/lib/content";

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };
type Path = (string | number)[];

const input =
  "w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 text-sm outline-none focus:border-accent";

const labelOf = (k: string) =>
  k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

function setIn(root: Json, path: Path, value: Json): Json {
  if (!path.length) return value;
  const [head, ...rest] = path;
  if (Array.isArray(root)) {
    const copy = [...root];
    copy[head as number] = setIn(copy[head as number], rest, value);
    return copy;
  }
  const obj = root as { [k: string]: Json };
  return { ...obj, [head]: setIn(obj[head as string], rest, value) };
}

/** An empty copy of a value, used as the template when adding a list item. */
function blank(v: Json): Json {
  if (Array.isArray(v)) return [];
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]));
  return "";
}

function Field({ name, value, path, onChange }: { name: string; value: Json; path: Path; onChange: (p: Path, v: Json) => void }) {
  if (typeof value === "string" || typeof value === "number") {
    const long = String(value).length > 70 || /text|message|paragraph/i.test(name);
    return (
      <label className="grid gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">{labelOf(name)}</span>
        {long ? (
          <textarea className={input} rows={4} value={String(value)} onChange={(e) => onChange(path, e.target.value)} />
        ) : (
          <input className={input} value={String(value)} onChange={(e) => onChange(path, e.target.value)} />
        )}
      </label>
    );
  }
  if (Array.isArray(value)) {
    const move = (i: number, d: number) => {
      const j = i + d;
      if (j < 0 || j >= value.length) return;
      const next = [...value];
      [next[i], next[j]] = [next[j], next[i]];
      onChange(path, next);
    };
    return (
      <fieldset className="grid gap-3 rounded-2xl border border-line p-4">
        <legend className="px-2 text-sm font-bold text-accent">{labelOf(name)}</legend>
        {value.map((item, i) => (
          <div key={i} className="grid gap-3 rounded-xl border border-line bg-surface-2 p-4">
            <div className="flex justify-end gap-1 text-muted">
              <button type="button" onClick={() => move(i, -1)} aria-label="Move up" className="rounded p-1 hover:text-ink"><ArrowUp size={16} /></button>
              <button type="button" onClick={() => move(i, 1)} aria-label="Move down" className="rounded p-1 hover:text-ink"><ArrowDown size={16} /></button>
              <button type="button" onClick={() => onChange(path, value.filter((_, j) => j !== i))} aria-label="Remove" className="rounded p-1 hover:text-red-400"><Trash2 size={16} /></button>
            </div>
            <Field name={`${name} ${i + 1}`} value={item} path={[...path, i]} onChange={onChange} />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange(path, [...value, value.length ? blank(value[value.length - 1]) : ""])}
          className="flex w-fit items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm hover:border-accent"
        >
          <Plus size={15} /> Add
        </button>
      </fieldset>
    );
  }
  if (value && typeof value === "object") {
    return (
      <div className="grid gap-4">
        {Object.entries(value).map(([k, v]) => (
          <Field key={k} name={k} value={v} path={[...path, k]} onChange={onChange} />
        ))}
      </div>
    );
  }
  return null;
}

export default function Editor({ contentKey, initial }: { contentKey: ContentKey; initial: unknown; template: unknown }) {
  const [data, setData] = useState<Json>(initial as Json);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();

  const onChange = (p: Path, v: Json) => setData((d) => setIn(d, p, v));

  const save = () =>
    start(async () => {
      const r = await saveContent(contentKey, data);
      setMsg("error" in r && r.error ? { ok: false, text: r.error } : { ok: true, text: "Saved. Your site is updated." });
    });

  const reset = () => {
    if (!confirm("Discard all edits to this section and go back to the original text?")) return;
    start(async () => {
      const r = await resetContent(contentKey);
      if ("error" in r && r.error) return setMsg({ ok: false, text: r.error });
      setMsg({ ok: true, text: "Reset to original. Reload this page to see it." });
    });
  };

  return (
    <div className="mt-8 grid gap-6">
      <Field name={contentKey} value={data} path={[]} onChange={onChange} />
      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface/95 p-4 backdrop-blur">
        <button onClick={save} disabled={pending} className="gold-bg rounded-full px-7 py-2.5 font-bold disabled:opacity-60">
          {pending ? "Saving…" : "Save changes"}
        </button>
        <button onClick={reset} disabled={pending} className="text-sm text-muted hover:text-ink">
          Reset to original
        </button>
        {msg && <span className={`text-sm ${msg.ok ? "text-emerald-400" : "text-red-400"}`}>{msg.text}</span>}
      </div>
    </div>
  );
}
