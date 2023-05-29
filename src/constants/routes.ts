export const ROUTE = {
  Index: '/',
  Auth: {
    Index: '/auth'
  },
  Company: {
    Index: '/company'
  },
  Calendar: {
    Index: '/calendar'
  },
  Groups: {
    Index: '/groups',
    Tasks: (groupId: string = ':groupId') => `/groups/${groupId}/tasks`,
    Task: (groupId: string = ':groupId', taskId: string = ':taskId') => `/groups/${groupId}/tasks/${taskId}`
  },
  Notifications: {
    Index: '/notifications'
  }
};
