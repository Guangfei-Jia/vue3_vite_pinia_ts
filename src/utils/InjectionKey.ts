import type { InjectionKey, Ref } from 'vue'

export const key = Symbol() as InjectionKey<Ref<number>>
