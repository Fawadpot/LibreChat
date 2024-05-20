import React, { useState } from 'react';
import { Button } from '../ui';

export default function FilesSectionSelector() {
  const [seletedSection, setSelectedSection] = useState('vectorStores');
  const darkButton = { backgroundColor: 'black', color: 'white' };
  const lightButton = { backgroundColor: '#f9f9f9', color: 'black' };
  return (
    <div className="flex h-12 w-52 flex-row justify-center rounded border bg-white p-1">
      <div className="flex w-2/3 items-center pr-1">
        <Button
          className="w-full rounded rounded-lg border"
          style={seletedSection === 'vectorStores' ? darkButton : lightButton}
          onClick={() => setSelectedSection('vectorStores')}
        >
          Vector Stores
        </Button>
      </div>
      <div className="flex w-1/3 items-center">
        <Button
          className="w-full rounded rounded-lg border"
          style={seletedSection === 'files' ? darkButton : lightButton}
          onClick={() => setSelectedSection('files')}
        >
          Files
        </Button>
      </div>
    </div>
  );
}
