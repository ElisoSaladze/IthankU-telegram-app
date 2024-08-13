// types.d.ts
//we can add our types here
declare namespace TYPES {
  type Pagination<T> = {
    content: Array<T>
    totalPages: number
    totalElements: number
  }
  type Range = {
    startDate: string
    endDate: string
  }
  type UserState = 'unauthenticated' | 'authenticated' | 'pending'
}
