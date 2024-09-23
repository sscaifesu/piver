declare module 'react-dom/client' {
  import { ReactNode } from 'react';

  interface RootOptions {
    hydrate?: boolean;
    hydrationOptions?: {
      onHydrated?: (suspenseInstance: Comment) => void;
      onDeleted?: (suspenseInstance: Comment) => void;
    };
  }

  // 添加 Root 的声明
  declare class Root {
    // 添加 render 方法的声明
    render(children: ReactNode): void;
    // 根据实际的 Root 类定义添加其他属性和方法
  }

  export function createRoot(container: Element | Document | DocumentFragment | Comment, options?: RootOptions): Root;
  export function hydrateRoot(container: Element | Document | DocumentFragment | Comment, initialChildren: ReactNode, options?: RootOptions): Root;
}