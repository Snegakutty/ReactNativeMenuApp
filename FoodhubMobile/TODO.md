# TODO: Add Delete Functionality with Slide Animation to CartScreen

- [ ] Add `removeItem` reducer to cartSlice.ts to remove a specific item by id
- [ ] Import Animated API in CartScreen.tsx and add animation state (Map of item.id to Animated.Value)
- [ ] Modify renderItem in CartScreen.tsx: Wrap itemContainer in Animated.View with translateX transform
- [ ] Add delete button in renderItem of CartScreen.tsx: On press, animate slide left, then dispatch removeItem
- [ ] Update cartScreen.styles.ts: Add styles for deleteButton (red background, positioned right)
- [ ] Test delete functionality and animation in the app
