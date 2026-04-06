import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageDropZoneProps {
  onImageSelect: (file: File) => void;
  preview: string | null;
  disabled?: boolean;
}

const ImageDropZone = ({ onImageSelect, preview, disabled }: ImageDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onImageSelect(file);
    },
    [onImageSelect]
  );

  return (
    <label
      className={`relative flex flex-col items-center justify-center w-full min-h-[280px] rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
        ${isDragging ? "border-primary bg-dropzone scale-[1.02]" : "border-border bg-card hover:border-dropzone-border hover:bg-dropzone"}
        ${disabled ? "opacity-60 pointer-events-none" : ""}
      `}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={handleFileInput}
        disabled={disabled}
      />
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="max-h-[260px] max-w-full rounded-xl object-contain shadow-md"
        />
      ) : (
        <div className="flex flex-col items-center gap-3 text-muted-foreground py-8">
          <div className="rounded-full bg-dropzone p-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <p className="text-base font-medium text-foreground">
            Drop your image here or <span className="text-primary underline">browse</span>
          </p>
          <p className="text-sm">Supports JPG, JPEG, PNG</p>
        </div>
      )}
    </label>
  );
};

export default ImageDropZone;
