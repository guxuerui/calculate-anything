export declare function useObservable<H, I = undefined>(
  observable: Observable<H>,
  options?: UseObservableOptions<I | undefined>
): Readonly<Ref<H | I>>
