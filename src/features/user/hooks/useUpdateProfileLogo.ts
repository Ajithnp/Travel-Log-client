import { useRef, useState, useCallback, useEffect } from "react";

interface useUpdateProfileLogoParams {
  onFileSelect?: (file: File,) => Promise<void>;

}

interface UseUpdateProfileLogoReturn {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  preview: string | null;
  selectedFile: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cancelPreview: () => void;
  uploadProfileImage: () => void;
}

const useUpdateProfileLogo = ({
  onFileSelect,
}: useUpdateProfileLogoParams): UseUpdateProfileLogoReturn => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const url = URL.createObjectURL(file);

      setPreview(url);
      setSelectedFile(file);
    },
    []
  );

  const cancelPreview = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);

    setPreview(null);
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [preview]);

  const uploadProfileImage = useCallback(() => {
    if (!selectedFile) return;
    onFileSelect?.(selectedFile);
  }, [selectedFile, onFileSelect]);

  /** Cleanup URL on unmount */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return {
    fileInputRef,
    preview,
    selectedFile,
    handleFileChange,
    cancelPreview,
    uploadProfileImage,
  };
};

export default useUpdateProfileLogo;
