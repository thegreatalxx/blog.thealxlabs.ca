import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

const components = {
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre 
      {...props} 
      className="bg-[#f6f8fa] dark:bg-[#161b22] border border-[#d0d7de] dark:border-[#30363d] p-4 overflow-x-auto text-sm font-mono my-4"
    >
      {children}
    </pre>
  ),
}

export function MarkdownContent({ source }: { source: string }) {
  return (
    <MDXRemote 
      source={source} 
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  )
}