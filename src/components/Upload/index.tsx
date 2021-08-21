/* eslint-disable no-plusplus */
import React, { useCallback, useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useField } from 'formik';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './UploadProgress';
import { UploadError } from './UploadError';

let currentId = 0;

function getNewId() {
  return ++currentId;
}

export interface UploadableFile {
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
}

const useStyles = makeStyles(theme => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: 'none',
  },
}));

export function MultipleFileUploadField({ name }: { name: string }) {
  const [_, __, helpers] = useField(name);
  const classes = useStyles();

  const [files, setFiles] = useState<UploadableFile[]>([]);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map(file => ({
      file,
      errors: [],
      id: getNewId(),
    }));
    const mappedRej = rejFiles.map(r => ({ ...r, id: getNewId() }));
    setFiles(curr => [...curr, ...mappedAcc, ...mappedRej]);
  }, []);

  useEffect(() => {
    helpers.setValue(files);
    // helpers.setTouched(true);
  }, [files]);

  function onUpload(file: File, url: string) {
    setFiles(curr =>
      curr.map(fw => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      }),
    );
  }

  function onDelete(file: File) {
    setFiles(curr => curr.filter(fw => fw.file !== file));
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/*'],
    maxSize: 1920 * 1080,
  });

  return (
    <>
      <Grid item>
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} />

          <p>Dragn drop some files here, or click to select files</p>
        </div>
      </Grid>

      {files.map(fileWrapper => (
        <Grid item key={fileWrapper.id}>
          {fileWrapper.errors.length ? (
            <UploadError
              file={fileWrapper.file}
              errors={fileWrapper.errors}
              onDelete={onDelete}
            />
          ) : (
            <SingleFileUploadWithProgress
              onDelete={onDelete}
              onUpload={onUpload}
              file={fileWrapper.file}
            />
          )}
        </Grid>
      ))}
    </>
  );
}
