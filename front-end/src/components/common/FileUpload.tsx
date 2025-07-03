import React, { useCallback, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  CheckCircle, 
  File, 
  FileAudio, 
  FileText,
  FileVideo,
  Image,
  Upload,
  X
} from 'lucide-react';

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
  onUploadComplete?: (uploadedFiles: any[]) => void;
  onError?: (error: string) => void;
  className?: string;
  disabled?: boolean;
}

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = '*/*',
  multiple = false,
  maxSize = 10, // 10MB default
  maxFiles = 5,
  onFilesSelected,
  onUploadComplete,
  onError,
  className = '',
  disabled = false
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith('image/')) {return <Image className="h-5 w-5" />;}
    if (type.startsWith('video/')) {return <FileVideo className="h-5 w-5" />;}
    if (type.startsWith('audio/')) {return <FileAudio className="h-5 w-5" />;}
    if (type.includes('pdf') || type.includes('document') || type.includes('text')) {
      return <FileText className="h-5 w-5" />;
    }
    return <File className="h-5 w-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) {return '0 Bytes';}
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type if accept is specified
    if (accept !== '*/*') {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const mimeType = file.type;
      
      const isAccepted = acceptedTypes.some(acceptedType => {
        if (acceptedType.startsWith('.')) {
          return fileExtension === acceptedType;
        }
        if (acceptedType.includes('*')) {
          const baseType = acceptedType.split('/')[0];
          return mimeType.startsWith(baseType);
        }
        return mimeType === acceptedType;
      });

      if (!isAccepted) {
        return `File type not supported. Accepted types: ${accept}`;
      }
    }

    return null;
  };

  const simulateUpload = async (file: File, id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Simulate upload completion
          setUploadedFiles(prev => prev.map(f => 
            f.id === id 
              ? { ...f, progress: 100, status: 'completed', url: URL.createObjectURL(file) }
              : f
          ));
          resolve();
        } else {
          setUploadedFiles(prev => prev.map(f => 
            f.id === id ? { ...f, progress } : f
          ));
        }
      }, 200);

      // Simulate occasional errors
      if (Math.random() < 0.1) {
        setTimeout(() => {
          clearInterval(interval);
          setUploadedFiles(prev => prev.map(f => 
            f.id === id 
              ? { ...f, status: 'error', error: 'Upload failed. Please try again.' }
              : f
          ));
          reject(new Error('Upload failed'));
        }, 1000);
      }
    });
  };

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    // Check max files limit
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      onError?.(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Validate files
    const validFiles: File[] = [];
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        onError?.(error);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) {return;}

    // Create upload entries
    const newUploads: UploadedFile[] = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'uploading' as const
    }));

    setUploadedFiles(prev => [...prev, ...newUploads]);
    onFilesSelected?.(validFiles);

    // Start uploads
    for (const upload of newUploads) {
      try {
        await simulateUpload(upload.file, upload.id);
      } catch (error) {
        console.error('Upload error:', error);
      }
    }

    // Notify completion
    const completedFiles = uploadedFiles.filter(f => f.status === 'completed');
    if (completedFiles.length > 0) {
      onUploadComplete?.(completedFiles);
    }
  }, [uploadedFiles, maxFiles, maxSize, onFilesSelected, onUploadComplete, onError]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFiles(files);
    }
    // Reset input value to allow selecting the same file again
    event.target.value = '';
  };

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    if (disabled) {return;}
    
    const files = event.dataTransfer.files;
    if (files) {
      handleFiles(files);
    }
  }, [handleFiles, disabled]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const retryUpload = async (id: string) => {
    const file = uploadedFiles.find(f => f.id === id);
    if (!file) {return;}

    setUploadedFiles(prev => prev.map(f => 
      f.id === id 
        ? { ...f, status: 'uploading', progress: 0, error: undefined }
        : f
    ));

    try {
      await simulateUpload(file.file, id);
    } catch (error) {
      console.error('Retry upload error:', error);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <Upload className={`h-8 w-8 mx-auto mb-2 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {isDragOver ? 'Drop files here' : 'Upload files'}
        </h3>
        <p className="text-gray-600 mb-2">
          Drag and drop files here, or click to browse
        </p>
        <p className="text-sm text-gray-500">
          {accept !== '*/*' && `Accepted formats: ${accept} • `}
          Max size: {maxSize}MB {multiple && `• Max files: ${maxFiles}`}
        </p>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
      </div>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">
            Files ({uploadedFiles.length}/{maxFiles})
          </h4>
          {uploadedFiles.map((uploadedFile) => (
            <div
              key={uploadedFile.id}
              className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50"
            >
              <div className="text-gray-600">
                {getFileIcon(uploadedFile.file)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFile.file.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        uploadedFile.status === 'completed' ? 'default' :
                        uploadedFile.status === 'error' ? 'destructive' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {uploadedFile.status === 'uploading' && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                          {Math.round(uploadedFile.progress)}%
                        </div>
                      )}
                      {uploadedFile.status === 'completed' && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Complete
                        </div>
                      )}
                      {uploadedFile.status === 'error' && (
                        <div className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Error
                        </div>
                      )}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(uploadedFile.id)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                  {uploadedFile.status === 'error' && uploadedFile.error && (
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-red-600">{uploadedFile.error}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => retryUpload(uploadedFile.id)}
                        className="h-6 text-xs"
                      >
                        Retry
                      </Button>
                    </div>
                  )}
                </div>
                
                {uploadedFile.status === 'uploading' && (
                  <Progress value={uploadedFile.progress} className="h-1 mt-1" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
