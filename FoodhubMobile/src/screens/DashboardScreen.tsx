import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {CategoryCard} from '../components/CategoryCard';
import {ItemCard} from '../components/ItemCard';
import {ItemDetailModal} from '../components/ItemDetailModal';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {
  fetchCategories,
  selectCategories,
  selectCategoriesLoading,
  selectCategoriesError,
} from '../store/slices/categoriesSlice';
import {
  fetchItemsForCategory,
  selectItemsMap,
  selectItemsLoading,
  selectItemsLoadingCategoryId,
  selectItemsError,
} from '../store/slices/itemsSlice';
import {
  fetchAddonsForItem,
  selectAddons,
  selectAddonsLoading,
  selectAddonsError,
  clearAddons,
} from '../store/slices/addonsSlice';
import {
  selectSelectedCategoryId,
  selectSelectedItem,
  selectModalVisible,
  setSelectedCategory,
  setSelectedItem,
  setModalVisible,
  closeModal,
} from '../store/slices/uiSlice';
import {dashboardStyles} from '../styles/screens/dashboard.styles';
import {theme} from '../theme';
import {Category, Item} from '../services/api';

export const DashboardScreen = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  // Selectors
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesLoading);
  const categoriesError = useAppSelector(selectCategoriesError);

  const itemsMap = useAppSelector(selectItemsMap);
  const itemsLoading = useAppSelector(selectItemsLoading);
  const loadingCategoryId = useAppSelector(selectItemsLoadingCategoryId);
  const itemsError = useAppSelector(selectItemsError);

  const addons = useAppSelector(selectAddons);
  const addonsLoading = useAppSelector(selectAddonsLoading);
  const addonsError = useAppSelector(selectAddonsError);

  const selectedCategoryId = useAppSelector(selectSelectedCategoryId);
  const selectedItem = useAppSelector(selectSelectedItem);
  const modalVisible = useAppSelector(selectModalVisible);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryPress = (category: Category) => {
    if (selectedCategoryId === category.id) {
      // Toggle off if same category clicked
      dispatch(setSelectedCategory(null));
      return;
    }

    dispatch(setSelectedCategory(category.id));

    // If items already loaded, don't reload
    if (itemsMap[category.id]) {
      return;
    }

    // Fetch items for the category
    dispatch(fetchItemsForCategory(category.id));
  };

  const handleItemPress = async (item: Item) => {
    dispatch(setSelectedItem(item));
    dispatch(fetchAddonsForItem(item.id));
    dispatch(setModalVisible(true));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(clearAddons());
  };

  const renderCategoryItem: ListRenderItem<Category> = ({item: category}) => {
    const categoryItems = itemsMap[category.id];
    const isLoading = loadingCategoryId === category.id;
    const isSelected = selectedCategoryId === category.id;

    return (
      <View>
        <CategoryCard
          name={category.name}
          onPress={() => handleCategoryPress(category)}
          isActive={isSelected}
        />
        {isSelected && (
          <View style={dashboardStyles.itemsContainer}>
            {isLoading ? (
              <ActivityIndicator color={theme.colors.primary} />
            ) : itemsError ? (
              <Text style={dashboardStyles.errorText}>{itemsError}</Text>
            ) : !categoryItems || categoryItems.length === 0 ? (
              <Text style={dashboardStyles.placeholder}>
                No items in this category
              </Text>
            ) : (
              <View style={dashboardStyles.itemsList}>
                {categoryItems.map(item => (
                  <ItemCard
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    vegType={item.veg_type}
                    isBestseller={item.is_bestseller}
                    size={item.size}
                    prepTime={item.prep_time_mins}
                    onPress={() => handleItemPress(item)}
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={dashboardStyles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <View style={dashboardStyles.container}>
        {categoriesLoading ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : categoriesError ? (
          <Text style={dashboardStyles.errorText}>{categoriesError}</Text>
        ) : (
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => String(item.id)}
            contentContainerStyle={dashboardStyles.content}
            ListHeaderComponent={
              <Text style={dashboardStyles.heading}>FoodHub Menu</Text>
            }
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={10}
          />
        )}

        <ItemDetailModal
          visible={modalVisible}
          item={selectedItem}
          addons={addons}
          onClose={handleCloseModal}
        />
      </View>
    </SafeAreaView>
  );
};
