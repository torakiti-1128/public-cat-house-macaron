import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FileUploadButtonProps {
    onChange: (files: FileList | null) => void;
    buttonName: string;
    multiple?: boolean;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
    onChange,
    buttonName,
    multiple = false,
}) => {
    return (
        <Button
            fullWidth
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{
                height: 50, // ボタンの高さを設定
            }}
        >
            {buttonName}
            <VisuallyHiddenInput
                type="file"
                onChange={(event) => {
                    console.log('Selected files:', event.target.files);
                    onChange(event.target.files);
                }}
                multiple={multiple}
            />
        </Button>
    );
};
