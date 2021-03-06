import {
  createStyles,
  LinearProgress,
  Typography,
  withStyles,
} from '@material-ui/core';
import React from 'react';
import { FileError } from 'react-dropzone';
import { FileHeader } from '../FileList';

export interface UploadErrorProps {
  file: File;
  onDelete: (file: File) => void;
  errors: FileError[];
}

const ErrorLinearProgress = withStyles(theme =>
  createStyles({
    bar: {
      backgroundColor: theme.palette.error.main,
    },
  }),
)(LinearProgress);

export function UploadError({ file, onDelete, errors }: UploadErrorProps) {
  return (
    <>
      <FileHeader file={file} onDelete={onDelete} />
      <ErrorLinearProgress variant="determinate" value={100} />
      {errors.map(error => (
        <div key={error.code}>
          <Typography color="error">{error.message}</Typography>
        </div>
      ))}
    </>
  );
}
