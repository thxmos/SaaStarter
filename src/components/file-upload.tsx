"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadIcon, XIcon } from "lucide-react";
import { BeatLoader } from "react-spinners";

export enum FileType {
  Image = "Image",
  Audio = "Audio",
}

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  onUpload: (file: File) => void;
  fileType: FileType;
  acceptedTypes: { [key: string]: any };
  uploading: boolean;
}

const FileUpload: React.FC<Props> = ({
  onUpload,
  fileType,
  acceptedTypes,
  uploading,
  file,
  setFile,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    console.log(selectedFile);
    console.log(acceptedTypes.hasOwnProperty(selectedFile.type));
    if (selectedFile && acceptedTypes.hasOwnProperty(selectedFile.type)) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    } else {
      setError("Invalid file type");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-gray-300 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          {preview && fileType === FileType.Image ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 mx-auto rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-0 right-0 rounded-full "
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div>
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop a file here, or click to select a file
              </p>
            </div>
          )}

          {preview && fileType === FileType.Audio && (
            <div className="flex items-center justify-center mt-4">
              <audio controls>
                <source src={preview} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <Button
                variant="destructive"
                size="icon"
                className="ml-4"
                onClick={removeFile}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        {file && (
          <p className="mt-2 text-sm text-gray-600">
            File: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
        <Button
          className="w-full mt-4"
          disabled={!file || uploading}
          onClick={() => file && onUpload(file)}
        >
          {/* Upload File */}

          {uploading ? <BeatLoader size={10} /> : "Upload File"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
