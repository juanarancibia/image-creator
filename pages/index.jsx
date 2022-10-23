import Head from 'next/head';

import { useState } from 'react';
import ImageParametersControls from 'components/ImageParametersControls';
import SketchContainer from 'components/SketchContainer';
import { COLOR_PALETTES } from 'shared/constants/color-palettes.const';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Home = () => {
  const [form, setForm] = useState({
    id: 1,
    r: 5,
    initialPoints: 3,
    speed: 25,
    framesColor: 25,
    bgColor: '#fff1db',
    colorPalette: COLOR_PALETTES['repetition'],
  });

  return (
    <>
      <Head>
        <title>Image creator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container flex flex-wrap justify-center align-center gap-10 mx-auto">
        <ImageParametersControls
          onFormChange={(newForm) =>
            setForm((current) => ({
              ...current,
              ...newForm,
              id: Math.random(),
            }))
          }
        />
        <SketchContainer form={form} />
      </div>
    </>
  );
};

export default Home;
