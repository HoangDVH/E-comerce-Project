import classNames from 'classnames'

export default function Skeleton({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames('animate-pulse rounded-md bg-neutral-200/90', className)}
      {...rest}
    />
  )
}
