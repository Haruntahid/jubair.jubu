export const REMIX_ICON_CATALOG_URL = "https://remixicon.com/";

interface IconClassFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
  showHint?: boolean;
}

export default function IconClassField({
  value,
  onChange,
  placeholder = "ri-link",
  inputClassName = "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500",
  showHint = true,
}: IconClassFieldProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-gray-800 border border-gray-700 rounded-lg"
          title="Preview"
        >
          <i
            className={`${value?.trim() || "ri-question-line"} text-lg text-emerald-400`}
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={inputClassName}
        />
        <a
          href={REMIX_ICON_CATALOG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/10 border border-gray-700 rounded-lg transition-colors"
          title="Browse Remix Icon catalog"
        >
          <i className="ri-external-link-line text-base" />
        </a>
      </div>
      {showHint && (
        <p className="text-xs text-gray-500 mt-1.5">
          Pick a class from{" "}
          <a
            href={REMIX_ICON_CATALOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline"
          >
            remixicon.com
          </a>{" "}
          (e.g. <code className="text-gray-400">ri-github-fill</code>)
        </p>
      )}
    </div>
  );
}
