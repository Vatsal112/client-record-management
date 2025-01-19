import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IFileUploadProps } from "@/types";

const FileUpload: React.FC<IFileUploadProps> = ({ onUpload }) => {
  const [error, setError] = useState("");
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError("");
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const newClients = JSON.parse(e?.target?.result as string);
          onUpload(newClients);
        } catch (error) {
          setError("Please upload a valid JSON file");
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="outline" asChild>
            <div className="flex items-center gap-2">
              <FaUpload className="h-4 w-4" />
              Upload JSON File
            </div>
          </Button>
        </label>
      </div>
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </Card>
  );
};

export default FileUpload;
