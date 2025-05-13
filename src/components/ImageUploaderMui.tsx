import React, { useState, useRef, ChangeEvent } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import Image from 'next/image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Example Icon

interface ImageUploaderMuiProps {
  onChange: (file: File | null) => void;
  buttonText?: string;
  label?: string;
  imgExtension?: string[];
  maxFileSize?: number; // in bytes
  withPreview?: boolean;
  defaultImage?: string | null;
  accept?: string; // e.g., "image/jpeg,image/png"
}

const ImageUploaderMui: React.FC<ImageUploaderMuiProps> = ({
  onChange,
  buttonText = 'Choose File',
  label,
  imgExtension = ['.jpg', '.jpeg', '.png'],
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  withPreview = true,
  defaultImage = null,
  accept = 'image/*',
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];

    if (file) {
      // Validate file type
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      if (!imgExtension.includes(fileExtension)) {
        setError(`Invalid file type. Accepted types: ${imgExtension.join(', ')}`);
        setSelectedFile(null);
        setPreviewUrl(defaultImage);
        onChange(null);
        return;
      }

      // Validate file size
      if (file.size > maxFileSize) {
        setError(`File is too large. Max size: ${maxFileSize / (1024 * 1024)}MB`);
        setSelectedFile(null);
        setPreviewUrl(defaultImage);
        onChange(null);
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(defaultImage);
      onChange(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ textAlign: 'center', my: 2 }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept={accept || imgExtension.map(ext => `image/${ext.substring(1)}`).join(',')}
      />
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={handleButtonClick}
      >
        {selectedFile ? selectedFile.name : buttonText}
      </Button>
      {label && (
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          {label}
        </Typography>
      )}
      {error && (
        <Typography variant="caption" display="block" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      {withPreview && previewUrl && (
        <Paper
          variant="outlined"
          sx={{
            mt: 2,
            width: '100%',
            maxWidth: 300,
            height: 200,
            position: 'relative',
            overflow: 'hidden',
            mx: 'auto',
          }}
        >
          <Image src={previewUrl} alt="Preview" layout="fill" objectFit="contain" />
        </Paper>
      )}
    </Box>
  );
};

export default ImageUploaderMui;
