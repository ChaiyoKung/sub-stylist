import { z } from 'zod';

export const isOnSchema = z.boolean();

export type IsOn = z.infer<typeof isOnSchema>;

export const isOnStorageKey: string = 'isOn';

export const defaultIsOn: IsOn = false;
