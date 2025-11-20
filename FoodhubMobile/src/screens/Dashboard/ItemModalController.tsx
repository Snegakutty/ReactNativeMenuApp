import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { ItemDetailModal } from '../../components/ItemDetailModal';

import {
  selectSelectedItem,
  selectModalVisible,
  closeModal
} from '../../store/slices/uiSlice';

import {
  selectAddons,
  clearAddons
} from '../../store/slices/addonsSlice';

export default function ItemModalController() {
  const dispatch = useAppDispatch();

  const selectedItem = useAppSelector(selectSelectedItem);
  const modalVisible = useAppSelector(selectModalVisible);
  const addons = useAppSelector(selectAddons);

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(clearAddons());
  };

  return (
    <ItemDetailModal
      visible={modalVisible}
      item={selectedItem}
      addons={addons}
      onClose={handleClose}
    />
  );
}
