import {
  twind,
  virtual,
  cssom,
  tx as tx$,
  cx as cx$,
  injectGlobal as injectGlobal$,
  keyframes as keyframes$,
} from '@twind/core'
// import the twind config
import config from '../../twind.config'
// @ts-ignore 
export const tw = /* #__PURE__ */ twind(
  config,
  typeof document === 'undefined' ? virtual() : cssom('style[data-library]'),
)
export const tx = /* #__PURE__ */ tx$.bind(tw)
export const cx = /* #__PURE__ */ cx$.bind(tw)
export const injectGlobal = /* #__PURE__ */ injectGlobal$.bind(tw)
export const keyframes = /* #__PURE__ */ keyframes$.bind(tw)