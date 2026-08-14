import { useRef, useState } from "react";
import { UploadCloud, X, FileText } from "lucide-react";

export default function FileDropzone({
  files,
  onFilesChange,
  accept = ".pdf,.jpg,.png",
  maxSizeMB = 10,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (fileList) => {
    const newFiles = Array.from(fileList);

    const currentSize = files.reduce((total, file) => {
      return total + file.size;
    }, 0);

    const newFilesSize = newFiles.reduce((total, file) => {
      return total + file.size;
    }, 0);

    const maxSize = maxSizeMB * 1024 * 1024;
    const totalSize = currentSize + newFilesSize;

    if (totalSize > maxSize) {
      alert(`Total file size cannot exceed ${maxSizeMB}MB.`);
      return;
    }

    onFilesChange([...files, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files?.length) {
      const files = Array.from(e.dataTransfer.files);

      const validFiles = files.filter((file) => {
        const extension = file.name.split(".").pop()?.toLowerCase();

        return ["pdf", "jpg", "png"].includes(extension);
      });

      if (validFiles.length < files.length) {
        alert("Only PDF, JPG, and PNG are allowed.");
      } else {
        addFiles(validFiles);
      }
    }
  };

  const removeFile = (index) => {
    onFilesChange(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragging
            ? "border-[#2563eb] bg-[#2563eb]/5"
            : "border-slate-300 bg-slate-50 hover:bg-slate-100"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => e.target.files?.length && addFiles(e.target.files)}
        />

        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
          <UploadCloud size={20} />
        </div>

        <p className="font-inter text-sm font-semibold text-slate-700">
          Drag &amp; drop files here
        </p>
        <p className="mt-1 font-inter text-sm text-slate-500">
          or click to browse from your computer
        </p>
        <p className="mt-3 font-inter text-xs text-slate-400">
          Supported formats: PDF, JPG, PNG (Max {maxSizeMB}MB)
        </p>
      </div>

      {/* Daftar file yang sudah dipilih */}
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <FileText size={16} className="shrink-0 text-slate-400" />
                <span className="truncate font-inter text-sm text-slate-700">
                  {file.name}
                </span>
                <span className="shrink-0 font-inter text-xs text-slate-400">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="shrink-0 text-slate-400 cursor-pointer hover:text-red-500"
                aria-label={`Delete ${file.name}`}
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
