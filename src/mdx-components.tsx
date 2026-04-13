import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: ({ children, ...props }) => (
      <pre 
        {...props} 
        className="bg-[#f6f8fa] border border-[#d0d7de] p-4 overflow-x-auto text-sm font-mono my-4"
      >
        {children}
      </pre>
    ),
    code: ({ children, className, ...props }) => {
      if (className) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
      return (
        <code className="bg-[#f6f8fa] px-1 py-0.5 text-sm font-mono" {...props}>
          {children}
        </code>
      )
    },
  }
}