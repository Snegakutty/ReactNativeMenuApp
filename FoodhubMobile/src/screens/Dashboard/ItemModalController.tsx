import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { ItemDetailModal } from '../../components/ItemDetailModal';

import {
  selectSelectedItem,
  selectModalVisible,
  closeModal
} from '../../store/slices/uiSlice';

import { selectAddonsByItem } from '../../store/slices/menuSlice';

export default function ItemModalController() {
  const dispatch = useAppDispatch();

  const selectedItem = useAppSelector(selectSelectedItem);
  const modalVisible = useAppSelector(selectModalVisible);

  const addonsByItem = useAppSelector(selectAddonsByItem);
  const addons = selectedItem ? addonsByItem[selectedItem.id] : [];

  const handleClose = () => {
    dispatch(closeModal());
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
