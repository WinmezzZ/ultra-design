import React, { FC } from 'react';
import { confirmModalStyles } from './modal-style';
import { useMergeProps } from '../utils/mergeProps';
import Modal, { ModalProps } from './modal';
import { Global } from '@emotion/react';

export interface ConfirmModalProps extends ModalProps {}

const defaultProps = {
  keyboard: false,
  center: true,
  hideClose: true,
  width: 'auto',
};

export type MergedConfirmModalrProps = typeof defaultProps & ConfirmModalProps;

const ConfirmModal: FC<ConfirmModalProps> = p => {
  const props = useMergeProps(defaultProps, p);

  return (
    <>
      <Global styles={confirmModalStyles(props)} /> <Modal {...props} />
    </>
  );
};

ConfirmModal.displayName = 'UltraConfirmModal';

export default ConfirmModal;
