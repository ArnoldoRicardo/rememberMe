import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Options } from 'easymde';
import 'easymde/dist/easymde.min.css';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

import { TOOLBAR } from './const';

function CreateNote() {
  const id = 1;
  const autosavedValue = localStorage.getItem(`smde_${id}`) || '';

  const handleSave = () => {
    console.log(autosavedValue);
    console.log('nueva nota');
  };

  const options = useMemo(() => {
    return {
      autosave: {
        enabled: true,
        uniqueId: id,
        delay: 1000,
      },
      autofocus: true,
      spellChecker: true,
      // minHeight: '85vh',
      placeholder: 'listo para comenzar una nueva nota',
      toolbar: [
        ...TOOLBAR,
        {
          name: 'new',
          action: handleSave,
          className: 'fa fa-star',
          title: 'nueva nota',
        },
        '|',
      ],
    } as Options;
  }, []);

  return (
    <>
      <Meta title="page 4" />
      <FullSizeCenteredFlexBox flexDirection="column">
        <SimpleMDE options={options} value={autosavedValue} />
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default CreateNote;
