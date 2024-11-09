import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawerOpen: false,
  notifications: [],
  unreadNotification: [],
  unseenNotificationCount: 0
}

export const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    setDrawerOpen: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    setNotification: (state, action) => {
      const { allNotification, unreadNotification, unseenNotificationCount } = action.payload;
      state.notifications = allNotification
      state.unreadNotification = unreadNotification
      state.unseenNotificationCount = unseenNotificationCount
    },
    addNewNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadNotification.unshift(action.payload);
      state.unseenNotificationCount += 1;
    },
    removeNotification: (state, action) => {
      // new notification add
      const restNotification = state.notifications?.filter(n => n._id !== action.payload._id);
      state.notifications = restNotification;
      // new unreadNotification add
      const restUnreadNotification = state.unreadNotification?.filter(n => n._id !== action.payload._id)
      state.unreadNotification = restUnreadNotification;
      // update unseenNotificationCount state
      state.unseenNotificationCount -= action.payload.status === "sent" ? 1 : 0;
    },
    removeMultipleNotification: (state, action) => {
      // unique Ids
      const uniqueIds = new Set(action.payload.map(item => item._id));
      // notification remove
      const restNotification = state.notifications?.filter(item => !uniqueIds.has(item._id));
      state.notifications = restNotification;
      // unreadNotification remove
      const restUnreadNotification = state.unreadNotification?.filter(item => !uniqueIds.has(item._id));
      state.unreadNotification = restUnreadNotification;
      // reduce unseenNotificationCount
      const sentCount = action.payload?.filter(item => item.status === "sent").length;
      state.unseenNotificationCount -= sentCount;
    },
    updateNotification: (state, action) => {
      const updatedNotification = action.payload;
      // notification update
      const updatedNotifications = state.notifications?.map(n =>
        n._id === updatedNotification._id ? updatedNotification : n
      );
      state.notifications = updatedNotifications;
      // unreadNotification update
      const restUnreadNotification = state.unreadNotification?.filter(n => n._id !== updatedNotification._id);
      state.unreadNotification = restUnreadNotification;
    },
    resetUnseenNotificationCount: (state) => {
      state.unseenNotificationCount = 0
    },
    resetNotificationState: () => initialState
  }
})

export const {
  setDrawerOpen,
  setNotification,
  addNewNotification,
  removeNotification,
  removeMultipleNotification,
  resetUnseenNotificationCount,
  updateNotification,
  resetNotificationState
} = notificationSlice.actions

export default notificationSlice.reducer
