"use client";

import dynamic from 'next/dynamic';

const FluidIridescentBackgroundDynamic = dynamic(
    () => import('@/components/backgrounds/FluidIridescentBackground').then(mod => mod.FluidIridescentBackground),
    { ssr: false }
);

export function FluidIridescentBackground() {
    return <FluidIridescentBackgroundDynamic />;
}
