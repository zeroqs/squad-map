interface Props {
  title: string
}

export const LayerTitle = ({ title }: Props) => {
  return (
    <div className="animate-fade animate-delay-200 pb-5">
      <span>Layer:</span>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight pb-5 inline pl-2">
        {title}
      </h3>
    </div>
  )
}
