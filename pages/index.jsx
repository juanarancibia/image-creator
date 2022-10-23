import Head from 'next/head';

import { useState } from 'react';
import ImageParametersControls from 'components/ImageParametersControls';
import SketchContainer from 'components/SketchContainer';
import { COLOR_PALETTES } from 'shared/constants/color-palettes.const';
import { SHAPES } from 'shared/constants/shapes.const';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Home = () => {
  const [form, setForm] = useState({
    id: 1,
    r: 5,
    initialPoints: 3,
    strokeWeight: 2,
    overlappingFactor: 1,
    speed: 25,
    framesColor: 25,
    bgColor: '#fff1db',
    colorPalette: COLOR_PALETTES['repetition'],
    alpha: 'FF',
    shape: SHAPES.LINE,
    lineAngle: 45,
    circleSize: 200,
    circleLayers: 7,
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
